package twozerotwo.buddiary.global.oauth.hadler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.global.jwt.service.JwtService;
import twozerotwo.buddiary.global.oauth.CustomOAuth2User;
import twozerotwo.buddiary.global.oauth.dto.LoginResponseDto;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.enums.Role;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {
	private final MemberRepository memberRepository;
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
				String accessToken = jwtService.createAccessToken(oAuth2User.getUsername(), oAuth2User.getSocialID(),
					oAuth2User.getSocialType());
				jwtService.sendAccessAndRefreshToken(response, accessToken, null);
				// response.sendRedirect("http://localhost:3000/login/sign");
				signUp(response, oAuth2User);

			} else {
				// 이미 가입한 회원이면 토큰 생성해준다.
				log.info("이미 가입한 사람입니다.");
				loginSuccess(response, oAuth2User);
			}

		} catch (Exception err) {
			log.error(err.getMessage());
		}

	}

	private void signUp(HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		Member findMember = memberRepository.findByUsername(oAuth2User.getUsername())
			.orElseThrow(() -> new UsernameNotFoundException("유저 가 존제 하지 않습니다"));
		LoginResponseDto loginResponseDto = LoginResponseDto.builder()
			.isNewBe(true)
			.id(findMember.getId())
			.username(findMember.getUsername())
			.build();
		String jsonResponse = objectMapper.writeValueAsString(loginResponseDto);
		response.setCharacterEncoding("utf-8");
		response.setContentType("application/json; charset=utf-8");
		response.getWriter().write(jsonResponse);
	}

	private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) throws
		IOException {
		log.info("로그인 성공은로 인헤 두개의 토큰을 발급합니다.");
		String accessToken = jwtService.createAccessToken(oAuth2User.getUsername(), oAuth2User.getSocialID(),
			oAuth2User.getSocialType());
		String refreshToken = jwtService.createRefreshToken();
		// 이미 가입한 사람의 정보를 줘야한다. 리프 엑세스 둘다 있다.
		//
		ObjectMapper objectMapper = new ObjectMapper();
		Member findMember = memberRepository.findByUsername(oAuth2User.getUsername())
			.orElseThrow(() -> new UsernameNotFoundException("유저 가 존제 하지 않습니다"));
		LoginResponseDto loginResponseDto = LoginResponseDto.builder()
			.id(findMember.getId())
			.isNewBe(false)
			.username(findMember.getUsername())
			.nickname(findMember.getNickname())
			.intro(findMember.getIntro())
			.points(findMember.getPoint())
			.profilePic(findMember.getProfilePath())
			.build();
		String jsonResponse = objectMapper.writeValueAsString(loginResponseDto);
		jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
		response.setCharacterEncoding("utf-8");
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().write(jsonResponse);

	}

}
