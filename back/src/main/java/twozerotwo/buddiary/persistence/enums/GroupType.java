package twozerotwo.buddiary.persistence.enums;

import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;

public enum GroupType {
	DOUBLE("DOUBLE"),
	PLURAL("PLURAL"),
	@JsonEnumDefaultValue
	UNKNOWN("UNKNOWN");
	private final String code;

	GroupType(String code) {
		this.code = code;
	}

	public String getCode() {
		return this.code;
	}


}
