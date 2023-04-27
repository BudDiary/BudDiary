package twozerotwo.buddiary.util.authutil;

import java.security.Key;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParserBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import twozerotwo.buddiary.global.advice.exception.NotFoundException;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

@Component
public class JwtUtil {
	@Value("${jwt.token.secret}")
	private String secretKey;
	@Autowired
	private MemberRepository repository;

	public Member getMemberFromToken(String accessToken) {
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		Key key = Keys.hmacShaKeyFor(keyBytes);
		JwtParserBuilder jwtParserBuilder = Jwts.parserBuilder();
		jwtParserBuilder.setSigningKey(key);
		Jws<Claims> claimsJws = Jwts.parserBuilder().build().parseClaimsJws(accessToken);
		String username = String.valueOf(claimsJws.getBody().get("username"));
		Member member = repository.findByUsername(username)
			.orElseThrow(() -> new NotFoundException("member 를 찾을수 없습니다."));
		return member;
	}
}
