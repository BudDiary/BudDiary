package twozerotwo.buddiary.domain.diary.dto;

import java.io.Serializable;

import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.persistence.entity.Club;
import twozerotwo.buddiary.persistence.entity.Diary;
import twozerotwo.buddiary.persistence.entity.Member;

@Getter
@Setter
@Slf4j
@RequiredArgsConstructor
public class DiaryPostRequest {
	private MultipartFile diaryPhoto;
	@Size(min = 1, max = 1000, message = "다이어리 내용은 1자 이상 1000자 이하여야 합니다.")
	private String text;
	private String clubUuid;
	// private Long memberId;

	public Diary makeClubDiary(String imageUrl, Club club) {
		log.info(imageUrl);
		return Diary.builder()
			.club(club)
			.text(this.text)
			.photoPath(imageUrl)
			// .writer(member)
			.build();
	}

	public Diary makePersonalDiary(String imageUrl) {
		log.info(imageUrl);
		return Diary.builder()
			.text(this.text)
			.photoPath(imageUrl)
			// .writer(member)
			.build();
	}
}
