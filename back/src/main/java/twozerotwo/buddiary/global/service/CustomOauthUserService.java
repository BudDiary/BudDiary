package twozerotwo.buddiary.global.service;

import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomOauthUserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
	private final MemberRepository memberRepository;
	private static final String KAKAO = "kakao";

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		log.info("CustomOAuth2UserService.loadUser() 실행 - OAuth2 로그인 요청 진입 이제 리소스 오너 로 요청합니다.");
		return null;
	}
}
