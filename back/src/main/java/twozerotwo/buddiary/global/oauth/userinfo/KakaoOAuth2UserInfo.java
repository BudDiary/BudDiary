package twozerotwo.buddiary.global.oauth.userinfo;

import java.util.Map;

import lombok.extern.slf4j.Slf4j;

/**
 * OAuth2UserInfo 상속받은 구현체
 * 각타입별로 존재할예정
 * 카카오 json 에 맞춰서 제공
 */
@Slf4j
public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

	public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getId() {
		return String.valueOf(attributes.get("id"));
	}

	@Override
	public String getNickname() {
		Map<String, Object> account = (Map<String, Object>)attributes.get("kakao_account");
		Map<String, Object> profile = (Map<String, Object>)account.get("profile");

		if (account == null || profile == null) {
			return null;
		}

		return (String)profile.get("nickname");
	}

	@Override
	public String getImageUrl() {
		Map<String, Object> account = (Map<String, Object>)attributes.get("kakao_account");
		Map<String, Object> profile = (Map<String, Object>)account.get("profile");

		if (account == null || profile == null) {
			return null;
		}

		return (String)profile.get("thumbnail_image_url");
	}

	@Override
	public String getEmail() {
		Map<String, Object> account = (Map<String, Object>)attributes.get("kakao_account");
		return (String)account.get("email");
	}
}
