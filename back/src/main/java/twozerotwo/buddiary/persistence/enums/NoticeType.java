package twozerotwo.buddiary.persistence.enums;

import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;

public enum NoticeType {
	GROUP_INVITE("GROUP_INVITE"),
	GROUP_WRITE("GROUP_WRITE"),
	DOUBLE_INVITE("GROUP_INVITE"),
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
