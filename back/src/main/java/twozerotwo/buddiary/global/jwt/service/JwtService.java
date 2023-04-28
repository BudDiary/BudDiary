package twozerotwo.buddiary.global.jwt.service;

import java.util.Date;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

@Slf4j
@Service
@RequiredArgsConstructor
@Getter
public class JwtService {
	private final MemberRepository memberRepository;
	@Value("${server.name}")
	private String envName;
	@Value("${jwt.token.secretKey}")
	private String secretKey;

	@Value("${jwt.access.expiration}")
	private Long accessTokenExpirationPeriod;

	@Value("${jwt.refresh.expiration}")
	private Long refreshTokenExpirationPeriod;

	/**
	 * JWT의 Subject와 Claim으로 email 사용 -> 클레임의 name을 "email"으로 설정
	 * JWT의 헤더에 들어오는 값 : 'Authorization(Key) = Bearer {토큰} (Value)' 형식
	 */
	private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
	private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";
	private static final String USERNAME_CLAIM = "username";
	private static final String BEARER = "Bearer ";

	/**
	 * AccessToken 생성 메소드
	 * 오늘 날자기준 access 토큰 생성
	 */
	public String createAccessToken(String username) {
		Date now = new Date();
		return JWT.create() // JWT 토큰을 생성하는 빌더 반환
			.withSubject(ACCESS_TOKEN_SUBJECT) // JWT의 Subject 지정 -> AccessToken이므로 AccessToken
			.withExpiresAt(new Date(now.getTime() + accessTokenExpirationPeriod)) // 토큰 만료 시간 설정

			//클레임으로는 저희는 email 하나만 사용합니다.
			//추가적으로 식별자나, 이름 등의 정보를 더 추가하셔도 됩니다.
			//추가하실 경우 .withClaim(클래임 이름, 클래임 값) 으로 설정해주시면 됩니다
			.withClaim(USERNAME_CLAIM, username)
			.sign(Algorithm.HMAC512(secretKey)); // HMAC512 알고리즘 사용, application-jwt.yml에서 지정한 secret 키로 암호화
	}

	public String createRefreshToken() {
		Date now = new Date();
		return JWT.create()
			.withSubject(REFRESH_TOKEN_SUBJECT)
			.withExpiresAt(new Date(now.getTime() + refreshTokenExpirationPeriod))
			.sign(Algorithm.HMAC512(secretKey));
	}

	/**
	 * AccessToken + RefreshToken 헤더에 실어서 보내기
	 */
	public void sendAccessAndRefreshToken(HttpServletResponse response, String accessToken, String refreshToken) {
		response.setStatus(HttpServletResponse.SC_OK);

		sendAccessToken(response, accessToken);
		sendRefreshToken(response, refreshToken);
		log.info("Access Token, Refresh Token 쿠키 설정 완료");
	}

	/**
	 * AccessToken 쿠키에 실어서 보내기
	 */
	public void sendAccessToken(HttpServletResponse response, String accessToken) {
		response.setStatus(HttpServletResponse.SC_OK);
		// TODO: 2023-04-28 httponly 설정
		Cookie cookie = new Cookie(ACCESS_TOKEN_SUBJECT, accessToken);

		if (envName == "local") {

			cookie.setDomain("local");
		}
		cookie.setPath("/");
		cookie.setMaxAge(1000000000);

		response.addCookie(cookie);
		log.info("재발급된 Access Token : {}", accessToken);
	}

	public void sendRefreshToken(HttpServletResponse response, String refreshToken) {
		response.setStatus(HttpServletResponse.SC_OK);
		// TODO: 2023-04-28 httponly 설정
		Cookie cookie = new Cookie(ACCESS_TOKEN_SUBJECT, refreshToken);
		if (envName == "local") {

			cookie.setDomain("local");
		}
		cookie.setPath("/");
		cookie.setMaxAge(1000000000);
		response.addCookie(cookie);
		log.info("재발급된 Access Token : {}", refreshToken);

	}

	/**
	 * RefreshToken DB 저장(업데이트)
	 */
	public void updateRefreshToken(String email, String refreshToken) {
		memberRepository.findByUsername(email)
			.ifPresentOrElse(member -> member.updateRefreshToken(refreshToken), () -> new Exception("일치하는 회원이 없습니다."));
	}

	public boolean isTokenValid(String token) {
		try {
			JWT.require(Algorithm.HMAC512(secretKey)).build().verify(token);
			log.info("유효한 토큰입니다.");
			return true;
		} catch (Exception e) {
			log.error("유효하지 않은 토큰입니다. {}", e.getMessage());
			return false;
		}
	}

	/**
	 * 헤더에서 RefreshToken 쿠키로 부터 추출 옵셔널 반환
	 */
	public Optional<String> extractRefreshToken(HttpServletRequest request) {
		for (Cookie cookie : request.getCookies()) {
			if (cookie.getName().equals(REFRESH_TOKEN_SUBJECT)) {
				return Optional.ofNullable(cookie.getValue()); // 옵셔널객체에 담아서 리턴
			}
		}
		return Optional.empty();

	}

	/**
	 * 헤더에서 AccessToken 쿠키로 부터 추출 옵셔널 반환
	 */
	public Optional<String> extractAccessToken(HttpServletRequest request) {
		for (Cookie cookie : request.getCookies()) {
			if (cookie.getName().equals(ACCESS_TOKEN_SUBJECT)) {
				return Optional.ofNullable(cookie.getValue());
			}
		}
		return Optional.empty();
	}

	/**
	 * AccessToken에서 Email 추출
	 * 추출 전에 JWT.require()로 검증기 생성
	 * verify로 AceessToken 검증 후
	 * 유효하다면 getClaim()으로 유저 이름 추출
	 * 유효하지 않다면 빈 Optional 객체 반환
	 */
	public Optional<String> extractUserName(String accessToken) {
		try {
			// 토큰 유효성 검사하는 데에 사용할 알고리즘이 있는 JWT verifier builder 반환
			return Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey)).build() // 반환된 빌더로 JWT verifier 생성
				.verify(accessToken) // accessToken을 검증하고 유효하지 않다면 예외 발생
				.getClaim(USERNAME_CLAIM) // claim(Emial) 가져오기
				.asString());
		} catch (Exception e) {
			log.error("액세스 토큰이 유효하지 않습니다.");
			return Optional.empty();
		}
	}
}
