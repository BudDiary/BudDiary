package twozerotwo.buddiary.domain.diary.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiaryPostResponse {
	private Long id;
	private String text;
	private String imagePath;
	private LocalDateTime writeDate;
	// private String writerNickname;
	// private Long writerId;
}
