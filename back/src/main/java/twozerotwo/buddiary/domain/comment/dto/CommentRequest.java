package twozerotwo.buddiary.domain.comment.dto;

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
	private String text;
	private String username;

}
