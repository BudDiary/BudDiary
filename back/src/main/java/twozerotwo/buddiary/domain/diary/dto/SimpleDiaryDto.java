package twozerotwo.buddiary.domain.diary.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.dto.ClubInfo;

@Getter
@Slf4j
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SimpleDiaryDto {
	// type: PERSONAL(개인), PLURAL(다수), DOUBLE(1:1)
	private String type;
	private ClubInfo clubInfo;
	private DiaryInfo diaryInfo;

}
