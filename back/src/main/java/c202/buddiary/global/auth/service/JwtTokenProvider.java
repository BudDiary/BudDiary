package c202.buddiary.global.auth.service;

import c202.buddiary.global.auth.dto.TokenInfo;
import c202.buddiary.persistence.repository.MemberRepository;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.security.Key;

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
    public TokenInfo generateToken(Authentication authentication){

        return null;
    }
}
