package twozerotwo.buddiary.domain.diary.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@Slf4j
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StickerToDiaryDto {
	@NotNull(message = "unusedStickerId를 입력해주세요.")
	private Long unusedStickerId;
	@NotNull(message = "다이어리 아이디를 입력해주세요.")
	private Long diaryId;
	// @NotNull(message = "x좌표를 입력해주세요.")
	@JsonProperty("xCoordinate")
	private double xCoordinate;
	// @NotNull(message = "y좌표를 입력해주세요.")
	@JsonProperty("yCoordinate")
	private double yCoordinate;
	@NotBlank(message = "사용자 아이디를 입력해주세요.")
	private String username;



}
