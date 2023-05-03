package twozerotwo.buddiary.domain.diary.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.comment.dto.CommentDto;
import twozerotwo.buddiary.domain.reaction.dto.ReactionDto;
import twozerotwo.buddiary.persistence.entity.Comment;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.entity.Reaction;

@Getter
@Setter
@Slf4j
@RequiredArgsConstructor
public class SimpleDiaryDto {
	// type: PERSONAL(개인), PLURAL(다수), DOUBLE(1:1)
	private String type;
	private String clubName;
	private String clubUuid;
	private Long diaryId;
	private Member writer;
	private LocalDateTime writeDate;
	private String text;
	private List<String> imgList;
	private Float positiveRate;
	private Float negativeRate;
	private List<Reaction> reactionList;
	private List<Comment> commentList;





	
}
