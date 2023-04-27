package twozerotwo.buddiary.global.auth.dto;

import java.util.Map;

import lombok.Builder;
import lombok.Getter;
import twozerotwo.buddiary.global.auth.userinfo.KakaoOAuth2UserInfo;
import twozerotwo.buddiary.global.auth.userinfo.OAuth2UserInfo;

/**
 * 여러 소셜 확장가능한 설계
 * 각소셜에서 받아오는 데이터가 다를수도 있다
 * 데이터를 가지고 있는 dto
 */
@Getter
public class OAuthAttributes {
	private String nameAttributeKey;// 오어스 로그인 진행시 키가 되는 필드값 , PK 와 같은 의미
	private OAuth2UserInfo oauth2UserInfo;// 소셜 타입별 로그인 유지 정보

	@Builder
	public OAuthAttributes(String nameAttributeKey, OAuth2UserInfo oauth2UserInfo) {
		this.nameAttributeKey = nameAttributeKey;
		this.oauth2UserInfo = oauth2UserInfo;
	}

	/**
	 * OAuthAttributes 생성하는 함수
	 *
	 * @param socialType
	 * @param userNameAttributeName
	 * @param attributes
	 * @return
	 */
	public static OAuthAttributes of(SocialType socialType,
		String userNameAttributeName, Map<String, Object> attributes) {
		//나중에
		if (socialType == SocialType.KAKAO) {
			return ofKakao(userNameAttributeName, attributes);
		}
		return null;
	}

	/**
	 * 추상클래스 에 있는 필드에 각 타입의 OAuth2UserInfo 를 생성해서 빌드합니다.
	 *
	 * @param userNameAttributeName
	 * @param attributes
	 * @return
	 */

	private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
		return OAuthAttributes.builder()
			.nameAttributeKey(userNameAttributeName)
			.oauth2UserInfo(new KakaoOAuth2UserInfo(attributes))
			.build();
	}
}
