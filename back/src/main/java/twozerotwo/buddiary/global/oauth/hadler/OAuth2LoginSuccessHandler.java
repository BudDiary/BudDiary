package twozerotwo.buddiary.global.oauth.hadler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.global.jwt.service.JwtService;
import twozerotwo.buddiary.global.oauth.CustomOAuth2User;
import twozerotwo.buddiary.persistence.enums.Role;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {
	private final JwtService jwtService;

	private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
	private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";
	private static final String USERNAME_CLAIM = "username";
	private static final String BEARER = "Bearer ";

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {
		log.info("OAuth 성공");
		try {
			CustomOAuth2User oAuth2User = (CustomOAuth2User)authentication.getPrincipal();
			if (oAuth2User.getRole() == Role.GUEST) {
				log.info("새로 가입하는 회원입니다.");
				String accessToken = jwtService.createAccessToken(oAuth2User.getEmail(), oAuth2User.getSocialID());
				// Cookie accessCookie = new Cookie(ACCESS_TOKEN_SUBJECT, accessToken);
				// 회원은 아니니 리프래쉬는 주지 않는다. 그냥 주지 말까? 가입하면 토큰주는걸로 할까
				jwtService.sendAccessAndRefreshToken(response, accessToken, null);
				response.sendRedirect("http://localhost:3000/login/sign");

			} else {
				// 이미 가입한 회원이면 토큰 생성해준다.
				log.info("이미 가입한 사람입니다.");
				loginSuccess(response, oAuth2User);
			}

		} catch (Exception err) {
			throw err;
		}

	}

	private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) {
		log.info("로그인 성공은로 인헤 두개의 토큰을 발급합니다.");
		String accessToken = jwtService.createAccessToken(oAuth2User.getEmail(), oAuth2User.getSocialID());
		String refreshToken = jwtService.createRefreshToken();
		log.info("토큰 발급 밑 디비갱신");
		jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
		jwtService.updateRefreshToken(oAuth2User.getEmail(), refreshToken);

	}

}
