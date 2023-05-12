package twozerotwo.buddiary.domain.diary.dto;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.persistence.entity.Club;
import twozerotwo.buddiary.persistence.entity.Diary;
import twozerotwo.buddiary.persistence.entity.Member;

@Getter
@Setter
@Slf4j
@RequiredArgsConstructor
public class DiaryPostRequest {
	private List<MultipartFile> fileList;
	@Size(min = 1, max = 1000, message = "다이어리 내용은 1자 이상 1000자 이하여야 합니다.")
	private String text;
	private List<String> clubList;
	@NotNull
	private Boolean isPersonal;
	private List<StickerDto> stickerDtoList;
	@NotNull
	private Float positiveRate;
	@NotNull
	private Float negativeRate;

}
