package twozerotwo.buddiary.domain.reply.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.diary.dto.WriterDto;

@Getter
@Slf4j
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReplyDto {
	private Long id;
	private WriterDto writer;
	private String text;
	private LocalDateTime writeDate;
}
