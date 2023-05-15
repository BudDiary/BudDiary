package twozerotwo.buddiary.global.oauth;

import java.util.Map;

import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.global.oauth.dto.SocialType;
import twozerotwo.buddiary.global.oauth.userinfo.KakaoOAuth2UserInfo;
import twozerotwo.buddiary.global.oauth.userinfo.OAuth2UserInfo;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.enums.Role;

/**
 * 여러 소셜 확장가능한 설계
 * 각소셜에서 받아오는 데이터가 다를수도 있다
 * 데이터를 가지고 있는 dto
 */
@Getter
@Slf4j
public class OAuthAttributes {
	// OAuth2 로그인 진행시 키가 되는 필드값 , PK 와 같은 의미
	private String nameAttributeKey;

	// 소셜 타입별 로그인 유저 정보 (유저 네임, 비밀번호 빼고 소셜에서 가져온 정보 담아 놓는거)
	private OAuth2UserInfo oauth2UserInfo;

	@Builder
	public OAuthAttributes(String nameAttributeKey, OAuth2UserInfo oauth2UserInfo) {
		this.nameAttributeKey = nameAttributeKey;
		this.oauth2UserInfo = oauth2UserInfo;
	}

	/**
	 * OAuthAttributes 생성하는 함수 소셜 타입에 맞춰 자기자신을 생성한다
	 * 서비스에서 이함수로 생성할예정 서비스에서 인자를 넣을거다
	 *
	 * @param socialType
	 * @param userNameAttributeName
	 * @param attributes
	 * @return
	 */
	public static OAuthAttributes of(SocialType socialType, String userNameAttributeName,
		Map<String, Object> attributes) {
		// 소셜 타입이 카카오라면 카카오 타입 OAuthAttributes 생성 ->반환
		if (socialType == SocialType.KAKAO) {
			return ofKakao(userNameAttributeName, attributes);
		}
		// 구글
		// 네이버
		return null;
	}

	/**
	 * 추상클래스 에 있는 필드에 각 타입의 OAuth2UserInfo 를 생성해서 빌드합니다.
	 * 카카오에 맞춰서 Dto 역활인 자기자신을 만들어냅니다.
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

	/**
	 * 이후에 CustomOAuth2UserService 에서 saveMember 에서 사용 DB에 저장할 내 서비스 Member
	 * OAuth2UserInfo의 정보를 사용하여 빌더로 빌드 후 반환합니다.
	 *
	 * @param socialType
	 * @param oauth2UserInfo
	 * @return
	 */
	public Member toEntity(SocialType socialType, OAuth2UserInfo oauth2UserInfo) {
		log.info("member 로 변환 중 nickName 정보를 출력합니다." + oauth2UserInfo.getNickname());
		log.info("member 로 변환 중 id 정보를 출력합니다." + oauth2UserInfo.getId());
		log.info("member 로 변환 중 getNickname 정보를 출력합니다." + oauth2UserInfo.getEmail());
		log.info("member 로 변환 중  image 정보를 출력합니다." + oauth2UserInfo.getImageUrl());
		return Member.builder()
			.username(oauth2UserInfo.getEmail()) //userName JWT 토큰 발급 위한 용도뿐
			.gender(oauth2UserInfo.getGender())
			.ageRange(oauth2UserInfo.getAgeRange())
			.socialType(socialType).socialId(oauth2UserInfo.getId()).role(Role.GUEST).build();
	}
}
