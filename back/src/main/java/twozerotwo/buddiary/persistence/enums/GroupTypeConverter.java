package twozerotwo.buddiary.persistence.enums;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;

public class GroupTypeConverter implements AttributeConverter<GroupType, String> {
	@Override
	public String convertToDatabaseColumn(GroupType type) {
		if (type == null) {
			return null;
		}
		return type.getCode();
	}

	@Override
	public GroupType convertToEntityAttribute(String code) {
		if (code == null) {
			return null;
		}
		return Stream.of(GroupType.values())
			.filter(c -> c.getCode().equals(code))
			.findFirst()
			.orElseThrow(IllegalArgumentException::new);
	}


}
