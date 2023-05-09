package twozerotwo.buddiary.domain.reply.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class ReplyRequest {
	private Long commentId;
	private String text;
	private String username;

}
