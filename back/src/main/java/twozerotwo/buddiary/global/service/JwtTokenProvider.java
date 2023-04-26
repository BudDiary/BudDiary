package twozerotwo.buddiary.global.service;

import java.security.Key;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.global.auth.dto.TokenInfo;
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

		return null;
	}
}
