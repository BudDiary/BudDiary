package twozerotwo.buddiary.global.oauth.dto;

// TODO: 2023/04/28 enum 퍼시스턴스로 옮겨야하나
public enum SocialType {
	KAKKO, NAVER, KAKAO, GOOGLE;
	public static SocialType of(String name) {
		for (SocialType type : SocialType.values()) {
			if (type.name().equalsIgnoreCase(name)) {
				return type;
			}
		}
		throw new IllegalArgumentException("올바르지 않은 소셜 타입입니다: " + name);
	}

}

