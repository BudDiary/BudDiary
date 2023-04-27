package twozerotwo.buddiary.global.service;

import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.global.oauth.OAuthAttributes;
import twozerotwo.buddiary.global.oauth.dto.SocialType;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomOauthUserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
	private final MemberRepository memberRepository;
	private static final String KAKAO = "kakao";

	/**
	 * DefaultOAuth2UserService 생성하고 loadUser(userRequest) 를 통해 DefaultOAuth2User 객체를 생성, 반환
	 * loadUser 는 리소스 서버로 요청을 보네 리소스 오너의 정보를 가져온다.
	 * OAuth2User 는 OAuth 서비스에서 가여온 유저 데이터
	 *
	 * @param userRequest the user request
	 * @return
	 * @throws OAuth2AuthenticationException
	 */
	@Override
	@Transactional
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

		log.info("CustomOAuth2UserService.loadUser() 실행 - OAuth2 로그인 요청 진입 이제 리소스 오너 로 요청합니다.");
		OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
		OAuth2User oAuth2User = delegate.loadUser(userRequest);
		String registrationId = userRequest.getClientRegistration().getRegistrationId(); // 소셜타입 저장
		SocialType socialType = getSocialType(registrationId);
		// OAuth2 로그인 시 키(PK)가 되는 값
		String userNameAttributeName = userRequest.getClientRegistration()
			.getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
		// 소셜 로그인에서 API가 제공하는 userInfo의 Json 값(유저 정보들)
		Map<String, Object> attributes = oAuth2User.getAttributes();
		OAuthAttributes extractAttributes = OAuthAttributes.of(socialType, userNameAttributeName, attributes);
		Member createdUser = getUser(extractAttributes, socialType); // getUser() 메소드로 User 객체 생성 후 반환
		// return new CustomOAuth2User(
		// 	Collections.singleton(new SimpleGrantedAuthority(createdUser.getRole().getKey())),
		// 	attributes,
		// 	extractAttributes.getNameAttributeKey(),
		// 	createdUser.getEmail(),
		// 	createdUser.getRole()
		// );
		return null;
	}

	private SocialType getSocialType(String registrationId) {

		if (KAKAO.equals(registrationId)) {
			return SocialType.KAKAO;
		}
		return null;
	}

	private Member getUser(OAuthAttributes attributes, SocialType socialType) {
		Member findUser = memberRepository.findByUsername(attributes.getOauth2UserInfo().getId()).orElse(null);

		if (findUser == null) {
			// 없으면 저장한다.
			return saveMember(attributes, socialType);
		}
		return findUser;
	}

	private Member saveMember(OAuthAttributes attributes, SocialType socialType) {
		Member createdUser = attributes.toEntity(socialType, attributes.getOauth2UserInfo());
		return memberRepository.save(createdUser);
	}
}
