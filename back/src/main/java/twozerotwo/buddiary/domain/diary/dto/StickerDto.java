package twozerotwo.buddiary.domain.diary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@Slf4j
@RequiredArgsConstructor
public class StickerDto {
	private Long stickerId;
	private Double xCoordinate;
	private Double yCoordinate;

}
