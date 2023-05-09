package twozerotwo.buddiary.global.oauth.userinfo;

import java.util.Map;

/**
 * 소셜 타입별로 유저 정보를 가지는 추상클래스
 * 상속시켜서 사용할예정
 * 맵타입으로 받아오는 시큐리티 특성 반영
 * OAuth 로 정보 가져올때 표준
 */
public abstract class OAuth2UserInfo {
	protected Map<String, Object> attributes; // 상속받은 클래스에서만 사용가능하게 프로텍티드

	public OAuth2UserInfo(Map<String, Object> attributes) {
		this.attributes = attributes;
	}
	//생성자 파라미터로 attributes 주입받아서 각 소셧타입별 유정 정보 클래스가 소셜 타입에 맞는 attributes 를 주입받아 가져가도록 함

	public abstract String getId();

	public abstract String getNickname();

	public abstract String getImageUrl();

	public abstract String getEmail();

}
