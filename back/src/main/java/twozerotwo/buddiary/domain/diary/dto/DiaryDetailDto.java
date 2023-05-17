package twozerotwo.buddiary.domain.diary.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiaryDetailDto {
	private SimpleDiaryDto simpleDiary;
	private List<UsedStickerDto> usedStickers;
}
