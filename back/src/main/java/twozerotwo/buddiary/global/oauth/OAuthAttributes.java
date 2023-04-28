package twozerotwo.buddiary.global.oauth;

import java.util.Map;

import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.global.oauth.dto.SocialType;
import twozerotwo.buddiary.global.oauth.userinfo.KakaoOAuth2UserInfo;
import twozerotwo.buddiary.global.oauth.userinfo.OAuth2UserInfo;
import twozerotwo.buddiary.persistence.entity.Member;

/**
 * 여러 소셜 확장가능한 설계
 * 각소셜에서 받아오는 데이터가 다를수도 있다
 * 데이터를 가지고 있는 dto
 */
@Getter
@Slf4j
public class OAuthAttributes {
	// 오어스 로그인 진행시 키가 되는 필드값 , PK 와 같은 의미
	private String nameAttributeKey;
	// 소셜 타입별 로그인 유지 정보

	private OAuth2UserInfo oauth2UserInfo;

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

	// TODO: 2023-04-27 추후 사업자 등록하면 추가 정보 넣어서 주어야합니다.

	/**
	 * 이후에 CustomOAuth2UserService에서 DB에 저장할 내 서비스 Member
	 * OAuth2UserInfo의 정보를 사용하여 빌더로 빌드 후 반환합니다.
	 *
	 * @param socialType
	 * @param oauth2UserInfo
	 * @return
	 */
	public Member toEntity(SocialType socialType, OAuth2UserInfo oauth2UserInfo) {
		log.info("member 로 변환 중 정보를 출력합니다." + oauth2UserInfo.getNickname());
		return Member.builder()
			.oauth2Id(oauth2UserInfo.getId())
			.build();
	}
}
