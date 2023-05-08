package twozerotwo.buddiary.domain.diary.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsedStickerDto {
	private Long stickerId;
	private Double xCoordinate;
	private Double yCoordinate;
	private String imgUrl;
}
