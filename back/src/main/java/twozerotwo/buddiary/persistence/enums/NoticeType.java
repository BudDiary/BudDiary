package twozerotwo.buddiary.persistence.enums;

import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;

public enum NoticeType {
	CLUB_INVITE("CLUB_INVITE"),
	CLUB_WRITE("CLUB_WRITE"),
	DOUBLE_INVITE("DOUBLE_INVITE"),
	@JsonEnumDefaultValue
	UNKOWN("UNKNOWN");
	private final String code;

	NoticeType(String code) {
		this.code = code;
	}

	public String getCode() {
		return this.code;
	}
}
