package twozerotwo.buddiary.domain.reply.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import twozerotwo.buddiary.persistence.entity.Member;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class ReplyResponse {
	private Long replyId;
	private String text;
	private Member writer;
	private LocalDateTime writeDate;

}
