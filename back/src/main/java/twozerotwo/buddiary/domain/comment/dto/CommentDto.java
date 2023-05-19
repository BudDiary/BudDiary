package twozerotwo.buddiary.domain.comment.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.diary.dto.WriterDto;
import twozerotwo.buddiary.domain.reply.dto.ReplyDto;

@Getter
@Slf4j
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
	private Long id;
	private WriterDto writer;
	private String text;
	private LocalDateTime writeDate;
	private List<ReplyDto> replies;

}
