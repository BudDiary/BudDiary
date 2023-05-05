package twozerotwo.buddiary.global.jwt.service;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.kafka.common.protocol.types.Field;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.global.advice.exception.NotFoundException;
import twozerotwo.buddiary.global.oauth.dto.SocialType;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

@Slf4j
@Service
@RequiredArgsConstructor
@Getter
public class JwtService {
	private final MemberRepository memberRepository;
	@Value("${server.name}")
	private String envName;
	@Value("${jwt.token.secret}")
	private String secretKey;

	@Value("${jwt.token.access.expiration}")
	private Long accessTokenExpirationPeriod;

	@Value("${jwt.token.refresh.expiration}")
	private Long refreshTokenExpirationPeriod;

	/**
	 * JWT의 Subject와 Claim으로 email 사용 -> 클레임의 name을 "email"으로 설정
	 * JWT의 헤더에 들어오는 값 : 'Authorization(Key) = Bearer {토큰} (Value)' 형식
	 */
	private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
	private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";
	private static final String USERNAME_CLAIM = "username";
	private static final String SOCIAL_ID = "socialId";
	private static final String SOCIAL_TYPE = "socialType";

	/**
	 * AccessToken 생성 메소드
	 * 오늘 날자기준 access 토큰 생성
	 */
	public String createAccessToken(String username, String socialId, SocialType socialType) {
		Date now = new Date();
		log.info("createAccessToken 토큰 만들기");
		return JWT.create() // JWT 토큰을 생성하는 빌더 반환
			.withSubject(ACCESS_TOKEN_SUBJECT) // JWT의 Subject 지정 -> AccessToken이므로 AccessToken
			.withExpiresAt(new Date(now.getTime() + accessTokenExpirationPeriod)) // 토큰 만료 시간 설정
			.withClaim(SOCIAL_ID, socialId)
			.withClaim(SOCIAL_TYPE, socialType.name())
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

		log.info("sendAccessAndRefreshToken 에 access token {}", accessToken);
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
		Cookie cookie = new Cookie(ACCESS_TOKEN_SUBJECT, "" + accessToken);
		log.info("profile mode is : {}", envName);
		if (envName.equals("local")) {
			cookie.setDomain("localhost");
		}
		cookie.setPath("/");
		cookie.setHttpOnly(true);
		cookie.setMaxAge(3600000);

		response.addCookie(cookie);
		log.info("발급된 Access Token : {}", accessToken);
	}

	public void sendRefreshToken(HttpServletResponse response, String refreshToken) {
		response.setStatus(HttpServletResponse.SC_OK);
		Cookie cookie = new Cookie(REFRESH_TOKEN_SUBJECT, "" + refreshToken);
		if (envName == "local") {

			cookie.setDomain("local");
		}
		cookie.setPath("/");
		cookie.setMaxAge(1209600000);
		cookie.setHttpOnly(true);
		response.addCookie(cookie);
		log.info("발급된 refreshToken  : {}", refreshToken);

	}

	/**
	 * RefreshToken DB 저장(업데이트)
	 */
	public void updateRefreshToken(String email, String refreshToken) {
		log.info("리프래쉬 토큰 다시 디비에 저장");
		memberRepository.findByUsername(email)
			.ifPresentOrElse(member -> member.updateRefreshToken(refreshToken),
				() -> new NotFoundException("일치하는 회원이 없습니다."));
	}

	public boolean isTokenValid(String token) {
		// TODO: 2023-05-03 exception 으로 처리 필요
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
		log.info("요청 받은 리퀘스트 {}", request.getRequestURI());
		if (request.getCookies() == null) {
			return Optional.empty();
		}
		try {
			for (Cookie cookie : request.getCookies()) {
				log.info("쿠키 {}", cookie.getName());
				if (cookie.getName().equals(REFRESH_TOKEN_SUBJECT)) {
					String token = cookie.getValue();
					if (token != null) {
						log.info(" extractRefreshToken 추출된 리프레쉬 토큰 token {}", token);
						return Optional.ofNullable(token); // 옵셔널객체에 담아서 리턴
					} else {
						return Optional.empty();
					}
				}
			}
			return Optional.empty();
		} catch (NullPointerException nullPointerException) {

			return Optional.empty();
		}
	}

	/**
	 * 쿠키에서 AccessToken 쿠키로 부터 추출 옵셔널 반환
	 */
	public Optional<String> extractAccessToken(HttpServletRequest request) {
		if (request.getCookies() == null) {
			return Optional.empty();
		}
		try {
			for (Cookie cookie : request.getCookies()) {
				log.info("요청에서 가져온 쿠키 {}", cookie.getName());
				if (cookie.getName().equals(ACCESS_TOKEN_SUBJECT)) {
					String token = cookie.getValue();
					if (token != null) {
						log.info(" extractAccessToken 추출된 엑세스 토큰 token {}", token);
						return Optional.ofNullable(token); // 옵셔널객체에 담아서 리턴
					} else {
						return Optional.empty();
					}
				}
			}
			return Optional.empty();
		} catch (NullPointerException nullPointerException) {

			return Optional.empty();
		}
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
			Optional<String> userName = Optional.ofNullable(
				JWT.require(Algorithm.HMAC512(secretKey)).build() // 반환된 빌더로 JWT verifier 생성
					.verify(accessToken) // accessToken을 검증하고 유효하지 않다면 예외 발생
					.getClaim(USERNAME_CLAIM) // claim(Emial) 가져오기
					.asString());
			log.info("access 토큰에서 추출된 유저 이름입니다 {}", userName.orElse("없습니다."));
			return userName;
		} catch (Exception e) {
			log.error("액세스 토큰이 유효하지 않습니다.");
			return Optional.empty();
		}
	}

	public Optional<String> extractSocialId(String accessToken) {
		try {
			// 토큰 유효성 검사하는 데에 사용할 알고리즘이 있는 JWT verifier builder 반환
			Optional<String> userName = Optional.ofNullable(
				JWT.require(Algorithm.HMAC512(secretKey)).build() // 반환된 빌더로 JWT verifier 생성
					.verify(accessToken) // accessToken을 검증하고 유효하지 않다면 예외 발생
					.getClaim(SOCIAL_ID) // claim(Emial) 가져오기
					.asString());
			log.info("access 토큰에서 추출된 SOCIAL_ID 입니다 {}", userName.orElse("없습니다."));
			return userName;
		} catch (Exception e) {
			log.error("액세스 토큰이 유효하지 않습니다.");
			return Optional.empty();
		}
	}

	public Optional<String> extractSocialType(String accessToken) {
		try {
			Optional<String> userName = Optional.ofNullable(
				JWT.require(Algorithm.HMAC512(secretKey)).build() // 반환된 빌더로 JWT verifier 생성
					.verify(accessToken) // accessToken을 검증하고 유효하지 않다면 예외 발생
					.getClaim(SOCIAL_TYPE)
					.asString());
			log.info("access 토큰에서 추출된 SOCIAL_TYPE 입니다 {}", userName.orElse("없습니다."));
			return userName;
		} catch (Exception e) {
			log.error("액세스 토큰이 유효하지 않습니다.");
			return Optional.empty();
		}
	}

	public Authentication getAuthentication(String accessToken) {
		String username = extractUserName(accessToken).orElse(null);
		log.info("유저 이름은 다음과 같습니다. {}", username);
		String socialId = extractSocialId(accessToken).orElse(null);
		String socialType = extractSocialType(accessToken).orElse(null);
		SocialType extractSocialType = SocialType.of(socialType);
		log.info("소셜 타입과 소셜 아이디 입니다. {}", extractSocialType.name(), socialId);
		Member member = memberRepository.findBySocialTypeAndSocialId(extractSocialType, socialId).orElse(null);
		log.info(member.getUsername());
		if (member == null) {
			log.error("맴버 정보가 없습니다. 빈값을 돌려보넵니다.");
			return new UsernamePasswordAuthenticationToken(null, "", null);
		}
		Collection<? extends GrantedAuthority> authorities = Collections.singleton(
			new SimpleGrantedAuthority(member.getRole().getKey()));
		UserDetails principal = new User(member.getUsername(), "", authorities);

		return new UsernamePasswordAuthenticationToken(principal, "", authorities);
	}
}
