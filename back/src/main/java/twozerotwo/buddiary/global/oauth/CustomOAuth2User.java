package twozerotwo.buddiary.global.oauth;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import lombok.Getter;
import twozerotwo.buddiary.global.oauth.dto.SocialType;
import twozerotwo.buddiary.persistence.enums.Role;

/**
 * 어떤 유저가 우리 서비스 입장하는지 모르니
 * oauth  로그인시 임의의 이메일을 생성해
 * access 토튼을 발급 받아서 회원 식별용으로 access 토큰을 사요합니다 추후
 * UserDetail 역활 의 객체 따로 재정의함
 * 추가할거 여기서 하면됨
 */
// TODO: 2023/04/28 사업자 등록 완료되면 여기다른 값들 추가해보기
@Getter
public class CustomOAuth2User extends DefaultOAuth2User {
	private String username;
	// OAuth 처음 로그인시 임의의 이메일을 여기에 넣는다.
	// 이후
	private Role role;
	// 추가 정보 입력하기 전에는 guest 추후 SuccessHandler 에서 추가 정보 를 입력하는 로직에서 사용할 예정
	// 추가 정보를 입력하면 user 의 상태를 가질 role
	private String socialID;
	private SocialType socialType;

	/**
	 * Constructs a {@code DefaultOAuth2User} using the provided parameters.
	 *
	 * @param authorities      the authorities granted to the user
	 * @param attributes       the attributes about the user
	 * @param nameAttributeKey the key used to access the user's &quot;name&quot; from
	 *                         {@link #getAttributes()}
	 */
	public CustomOAuth2User(Collection<? extends GrantedAuthority> authorities,
		Map<String, Object> attributes, String nameAttributeKey, String username, Role role, String socialID,
		SocialType socialType) {
		super(authorities, attributes, nameAttributeKey);
		this.username = username;
		this.role = role;
		this.socialID = socialID;
		this.socialType = socialType;
	}

}
