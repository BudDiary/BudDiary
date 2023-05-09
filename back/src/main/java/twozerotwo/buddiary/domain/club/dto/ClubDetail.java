package twozerotwo.buddiary.domain.club.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import twozerotwo.buddiary.domain.diary.dto.DiaryInfo;
import twozerotwo.buddiary.persistence.entity.Member;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ClubDetail {
	private List<DiaryInfo> diaryList;
	private List<Member> memberList;
	private ClubInfo clubInfo;
}
