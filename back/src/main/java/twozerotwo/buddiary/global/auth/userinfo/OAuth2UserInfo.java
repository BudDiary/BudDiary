package twozerotwo.buddiary.global.auth.userinfo;

import java.util.Map;

public abstract class OAuth2UserInfo {
	protected Map<String, Object> attributes; // 상속받은 클래스에서만 사용가능하게 프로텍티드

	public OAuth2UserInfo(Map<String, Object> attributes) {
		this.attributes = attributes;
	}//생성자 파라미터로 attributes 주입받아서 각 소셧타입별 유정 정보 클래스가 소셜 타입에 맞는 attributes 를 주입받아 가져가도록 함

	public abstract String getId();

	public abstract String getNickname();

	public abstract String getImageUrl();

}
