package twozerotwo.buddiary.domain.comment.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import twozerotwo.buddiary.persistence.entity.Member;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class CommentResponse {
	private Long commentId;
	private String text;
	private Member writer;
	private LocalDateTime writeDate;

}
