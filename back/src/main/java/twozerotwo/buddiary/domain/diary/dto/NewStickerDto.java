package twozerotwo.buddiary.domain.diary.dto;

import java.util.List;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewStickerDto {
	@NotNull(message = "다이어리 아이디를 입력해주세요.")
	private Long diaryId;
	private List<StickerDto> stickerDtoList;
}
