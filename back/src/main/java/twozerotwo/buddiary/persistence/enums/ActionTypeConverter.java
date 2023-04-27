package twozerotwo.buddiary.persistence.enums;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;

public class ActionTypeConverter implements AttributeConverter<ActionType, String> {
	@Override
	public String convertToDatabaseColumn(ActionType type) {
		if (type == null) {
			return null;
		}
		return type.getCode();
	}

	@Override
	public ActionType convertToEntityAttribute(String code) {
		if (code == null) {
			return null;
		}
		return Stream.of(ActionType.values())
			.filter(c -> c.getCode().equals(code))
			.findFirst()
			.orElseThrow(IllegalArgumentException::new);
	}
}
