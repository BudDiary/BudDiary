package twozerotwo.buddiary.persistence.enums;

import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;

public enum NoticeType {
	CLUB_INVITE("CLUB_INVITE"), // 안쓸듯
	CLUB_WRITE("CLUB_WRITE"),
	DOUBLE_INVITE("DOUBLE_INVITE"),
	@JsonEnumDefaultValue
	UNKNOWN("UNKNOWN");
	private final String code;

	NoticeType(String code) {
		this.code = code;
	}

	public String getCode() {
		return this.code;
	}
}
