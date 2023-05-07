package twozerotwo.buddiary.domain.comment.dto;

import java.time.LocalDateTime;

import twozerotwo.buddiary.domain.diary.dto.WriterDto;

public class CommentDto {
	private WriterDto writer;
	private String text;
	private LocalDateTime writeDate;
	// private
}
