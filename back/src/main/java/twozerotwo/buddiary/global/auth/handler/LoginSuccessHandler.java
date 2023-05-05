package twozerotwo.buddiary.global.auth.handler;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.global.advice.exception.NotFoundException;
import twozerotwo.buddiary.global.jwt.service.JwtService;
import twozerotwo.buddiary.global.oauth.dto.SocialType;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

@Slf4j
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	private final JwtService jwtService;
	private final MemberRepository memberRepository;

	@Value("${jwt.token.access.expiration}")
	private String accessTokenExpiration;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
		Authentication authentication) throws IOException, ServletException {
		String username = extractUsernameFromAuthentication(authentication);
		String socialID = extractSocialIdFromAuthentication(authentication);
		SocialType socialType = extractSocialTypeFromAuthentication(authentication);
		String accessToken = jwtService.createAccessToken(username, socialID, socialType);
		String refreshToken = jwtService.createRefreshToken();
		// 쿠키로 전달
		jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
		// 리프래쉬 기억
		memberRepository.findByUsername(username).ifPresent(member -> {
			member.updateRefreshToken(refreshToken);
			memberRepository.saveAndFlush(member);
		});
		log.info("로그인에 성공하셨습니다. 아이디 : {}", username);
		log.info("로그인에 성공하셨습니다. accessToken : {}", accessToken);
		log.info("로그인에 성공하셨습니다. 만료기간 지금으로 부터: {}", accessTokenExpiration);
	}

	private String extractUsernameFromAuthentication(Authentication authentication) {
		UserDetails userDetails = (UserDetails)authentication.getPrincipal();
		return userDetails.getUsername();
	}

	private String extractSocialIdFromAuthentication(Authentication authentication) {
		UserDetails userDetails = (UserDetails)authentication.getPrincipal();
		Member member = memberRepository.findByUsername(userDetails.getUsername())
			.orElseThrow(() -> new NotFoundException("OAuth 성공 했지만 맴버 가 디비에 없습니다."));
		return member.getSocialId();
	}

	private SocialType extractSocialTypeFromAuthentication(Authentication authentication) {
		UserDetails userDetails = (UserDetails)authentication.getPrincipal();
		Member member = memberRepository.findByUsername(userDetails.getUsername())
			.orElseThrow(() -> new NotFoundException("OAuth 성공 했지만 맴버 가 디비에 없습니다."));
		return member.getSocialType();
	}

}
