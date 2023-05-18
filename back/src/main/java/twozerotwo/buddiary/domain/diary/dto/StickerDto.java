package twozerotwo.buddiary.domain.diary.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StickerDto {
	// @JsonProperty("stickerUrl")
	private String stickerUrl;
	private Double xCoordinate;
	private Double yCoordinate;

}
