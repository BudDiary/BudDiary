package twozerotwo.buddiary.domain.diary.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WriterDto {
	private String nickname;
	private String username;
	private String profilePath;
}
