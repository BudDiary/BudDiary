package twozerotwo.buddiary.domain.comment.dto;

import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class CommentRequest {
	private Long diaryId;
	@Size(min = 1, max = 200, message = "댓글은 1자 이상 200자 이하여야 합니다.")
	private String text;
	private String username;

}
