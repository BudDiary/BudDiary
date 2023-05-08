package twozerotwo.buddiary.domain.sticker.dto;

import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@Slf4j
@RequiredArgsConstructor
public class StickerRegisterRequest {
	private String name;
	@NotNull(message = "파일을 등록해주세요.")
	private MultipartFile imgFile;
	private Long price;
}
