package twozerotwo.buddiary.domain.sticker.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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
	@Size(min = 1, max = 20, message = "스티커 이름은 1자 이상 20자 이하여야 합니다.")
	private String name;
	@NotNull(message = "파일을 등록해주세요.")
	private MultipartFile imgFile;
	@NotBlank(message = "스티커 가격을 설정하지 않았습니다.")
	private Long price;
}
