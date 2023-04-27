package twozerotwo.buddiary.global.oauth.userinfo;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {
	public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getId() {
		Map<String, Object> response = (Map<String, Object>)attributes.get("response");

		if (response == null) {
			return null;
		}
		return (String)response.get("id");
	}

	@Override
	public String getNickname() {
		Map<String, Object> response = (Map<String, Object>)attributes.get("response");

		if (response == null) {
			return null;
		}

		return (String)response.get("nickname");
	}

	@Override
	public String getImageUrl() {
		Map<String, Object> response = (Map<String, Object>)attributes.get("response");

		if (response == null) {
			return null;
		}

		return (String)response.get("profile_image");
	}
}
