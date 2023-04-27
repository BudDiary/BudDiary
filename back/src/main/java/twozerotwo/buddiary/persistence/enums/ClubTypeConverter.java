package twozerotwo.buddiary.persistence.enums;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;

public class ClubTypeConverter implements AttributeConverter<ClubType, String> {
	@Override
	public String convertToDatabaseColumn(ClubType type) {
		if (type == null) {
			return null;
		}
		return type.getCode();
	}

	@Override
	public ClubType convertToEntityAttribute(String code) {
		if (code == null) {
			return null;
		}
		return Stream.of(ClubType.values())
			.filter(c -> c.getCode().equals(code))
			.findFirst()
			.orElseThrow(IllegalArgumentException::new);
	}


}
