package twozerotwo.buddiary.domain.diary.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.persistence.entity.Comment;
import twozerotwo.buddiary.persistence.entity.DiaryImage;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.entity.Reaction;

@Getter
@Setter
@Slf4j
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SimpleDiaryDto {
	// type: PERSONAL(개인), PLURAL(다수), DOUBLE(1:1)
	private String type;
	@Builder.Default
	private String clubName = null;
	@Builder.Default
	private String clubUuid = null;
	private Long diaryId;
	private Member writer;
	private LocalDateTime writeDate;
	private String text;
	private List<DiaryImage> imgList;
	private Float positiveRate;
	private Float negativeRate;
	private List<Reaction> reactionList;
	private List<Comment> commentList;

}
