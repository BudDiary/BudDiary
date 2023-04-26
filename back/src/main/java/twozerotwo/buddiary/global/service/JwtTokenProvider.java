package twozerotwo.buddiary.global.service;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.global.advice.exception.NotFoundException;
import twozerotwo.buddiary.global.auth.dto.TokenInfo;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

@Service
@Slf4j
public class JwtTokenProvider {
	private final Key key;
	private final MemberRepository memberRepository;

	// 생성자
	public JwtTokenProvider(@Value("${jwt.token.secret}") String secretKey, MemberRepository memberRepository) {
		byte[] keyByte = Decoders.BASE64.decode(secretKey);
		this.memberRepository = memberRepository;
		this.key = Keys.hmacShaKeyFor(keyByte);
	}

	// 유정 정보 를 가져와 토큰을  at rt 만드는 메소드
	public TokenInfo generateToken(Authentication authentication) {
		long now = (new Date()).getTime();
		String authorities = authentication.getAuthorities().stream()
			.map(GrantedAuthority::getAuthority)
			.collect(Collectors.joining(","));
		Member member = memberRepository.findByUsername(authentication.getName())
			.orElseThrow(() -> new NotFoundException("회원을 찾을 수 없습니다."));
		Date accessTokenExpiresIn = new Date(now + 86400000);
		String accessToken = Jwts.builder()
			.setSubject(authentication.getName())
			.claim("auth", authorities)
			.claim("username", member.getUsername())
			.setExpiration(accessTokenExpiresIn)
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
		String refreshToken = Jwts.builder()
			.setSubject(authentication.getName())
			.setExpiration(accessTokenExpiresIn)
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
		return TokenInfo.builder()
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.build();
	}

	/**
	 * token 으로 부터 Authentication 을 가져오는 메소드
	 * @param accessToken
	 * @return
	 */
	public Authentication getAuthentication(String accessToken){
		// 토큰으로부터 claims 추출
		Claims claims = parseClaims(accessToken);
		if(claims.get("auth") == null){
			// 테스트 필요;
			throw new RuntimeException("권한 정보가 없는 토큰입니다");
		}
		// 토큰 클래임에서 'auth' 정보 가져오기
		Collection<? extends GrantedAuthority> authorities =
			Arrays.stream(claims.get("auth").toString().split(","))
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());
		UserDetails principal = new User(claims.getSubject(), "", authorities);
		//credentials 를 빈문자열을 주는이유?
		//UsernamePasswordAuthenticationToken 형태의 Authentication 객체 반환
		return new UsernamePasswordAuthenticationToken(principal, "", authorities);
	}

	/**
	 * 토큰파싱해 Claims 를 반환하는 함수
	 * @param accessToken
	 * @return
	 */
	public Claims parseClaims(String accessToken){
		try{
			// jws 를 사용하는 이유는 서명이 있다 == jws , 평문이다 jwt 이기 때문에
			return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
		}catch (ExpiredJwtException err){
			return err.getClaims();
		}
	}
}
