package twozerotwo.buddiary.global.service;

import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

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
}
