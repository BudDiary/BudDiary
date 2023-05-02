package twozerotwo.buddiary.domain.diary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class StickerDto {
	private Long stickerId;
	private Double xCoordinate;
	private Double yCoordinate;

}
