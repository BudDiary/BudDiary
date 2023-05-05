package twozerotwo.buddiary.global.oauth.service;

import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.global.oauth.CustomOAuth2User;
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
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

		log.info("CustomOAuth2UserService.loadUser() 실행 - OAuth2 로그인 요청 진입 이제 리소스 오너 로 요청합니다.");
		//DefaultOAuth2UserService 에 위임 oauth 정보를 가져온다
		OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
		OAuth2User oAuth2User = delegate.loadUser(userRequest);
		/**
		 * userRequest에서 registrationId 추출 후 registrationId으로 SocialType 저장
		 * http://localhost:8080/oauth2/authorization/kakao에서 kakao가 registrationId
		 * userNameAttributeName은 이후에 nameAttributeKey로 설정된다.
		 */
		String registrationId = userRequest.getClientRegistration().getRegistrationId(); // 등록 아이디저장
		SocialType socialType = getSocialType(registrationId); // 소셜타입 저장
		// OAuth2 로그인 시 키(PK)가 되는 값
		String userNameAttributeName = userRequest.getClientRegistration()
			.getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
		// 소셜 로그인에서 API가 제공하는 userInfo의 Json 값(유저 정보들)
		Map<String, Object> attributes = oAuth2User.getAttributes();

		OAuthAttributes extractAttributes = OAuthAttributes.of(socialType, userNameAttributeName, attributes);
		Member createdUser = getUser(extractAttributes, socialType); // getUser() 메소드로 User 객체 생성 후 반환
		log.info("oauth 를 통해 얻어온 getEmail 정보 : {}", extractAttributes.getOauth2UserInfo().getEmail());
		log.info("oauth 를 통해 얻어온 getNickname 정보 : {}", extractAttributes.getOauth2UserInfo().getNickname());
		log.info("oauth 를 통해 얻어온 getId 정보 : {}", extractAttributes.getOauth2UserInfo().getId());
		log.info("oauth 를 통해 얻어온 getImageUrl 정보 : {}", extractAttributes.getOauth2UserInfo().getImageUrl());
		// 시큐리티 컨텍스트 저장을위한 UserDetail 생성
		return new CustomOAuth2User(
			Collections.singleton(new SimpleGrantedAuthority(createdUser.getRole().getKey())),
			attributes,
			extractAttributes.getNameAttributeKey(),
			createdUser.getUsername(),
			createdUser.getRole(),
			createdUser.getSocialId()
		);
	}

	private SocialType getSocialType(String registrationId) {
		log.info("registrationId : {}", registrationId);
		//registrationId is a unique identifier for the ClientRegistration.
		if (KAKAO.equals(registrationId)) {
			log.info("카카오 분기처리 성공");
			return SocialType.KAKAO;
		}
		return null;
	}

	/**
	 * SocialType과 attributes에 들어있는 소셜 로그인의 식별값 id를 통해 회원을 찾아 반환하는 메소드
	 * 만약 찾은 회원이 있다면, 그대로 반환하고 없다면 saveUser()를 호출하여 회원을 저장한다.
	 */
	private Member getUser(OAuthAttributes attributes, SocialType socialType) {
		log.info("유저가 없으면 저장하고 있으면 던져준다", attributes.getOauth2UserInfo().getNickname());
		Member findUser = memberRepository.findBySocialTypeAndSocialId(socialType,
				attributes.getOauth2UserInfo().getId())
			.orElse(null);

		if (findUser == null) {
			// 없으면 저장한다.
			return saveMember(attributes, socialType);
		}
		return findUser;
	}

	/**
	 * OAuthAttributes의 toEntity() 메소드를 통해 빌더로 User 객체 생성 후 반환
	 * 생성된 User 객체를 DB에 저장 : socialType, socialId, email, role 값만 있는 상태
	 */
	private Member saveMember(OAuthAttributes attributes, SocialType socialType) {
		Member createdUser = attributes.toEntity(socialType, attributes.getOauth2UserInfo());
		return memberRepository.save(createdUser);
	}
}
