package twozerotwo.buddiary.global.oauth;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import lombok.Getter;

/**
 * 어떤 유저가 우리 서비스 입장하는지 모르니
 * oauth  로그인시 임의의 이메일을 생성해
 * access 토튼을 발급 받아서 회원 식별용으로 access 토큰을 사요합니다 추후
 */
@Getter
public class CustomOAuth2User extends DefaultOAuth2User {
	private String email;
	private String role;

	/**
	 * Constructs a {@code DefaultOAuth2User} using the provided parameters.
	 *
	 * @param authorities      the authorities granted to the user
	 * @param attributes       the attributes about the user
	 * @param nameAttributeKey the key used to access the user's &quot;name&quot; from
	 *                         {@link #getAttributes()}
	 */
	public CustomOAuth2User(Collection<? extends GrantedAuthority> authorities,
		Map<String, Object> attributes, String nameAttributeKey, String email, String role) {
		super(authorities, attributes, nameAttributeKey);
		this.email = email;
		this.role = role;
	}

}
