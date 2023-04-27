package twozerotwo.buddiary.persistence.enums;

import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;

public enum ActionType {
	SURPRISED("SURPRISED"),
	SAD("SAD"),
	LIKED("LIKED"),
	BEST("BEST"),
	ANGRY("ANGRY");
	private final String code;

	ActionType(String code) {
		this.code = code;
	}

	public String getCode() {
		return this.code;
	}
}
