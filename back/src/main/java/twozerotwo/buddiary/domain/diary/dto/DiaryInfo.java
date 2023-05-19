package twozerotwo.buddiary.domain.diary.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.comment.dto.CommentDto;
import twozerotwo.buddiary.domain.reaction.dto.ReactionDto;
import twozerotwo.buddiary.persistence.entity.Comment;
import twozerotwo.buddiary.persistence.entity.DiaryImage;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.entity.Reaction;

@Getter
@Slf4j
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiaryInfo {
	private Long diaryId;
	private WriterDto writer;
	private LocalDateTime writeDate;
	private String text;
	private List<DiaryImageDto> imgList;
	private Float positiveRate;
	private Float negativeRate;
	private List<ReactionDto> reactionList;
	private List<CommentDto> commentList;
}
