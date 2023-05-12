package twozerotwo.buddiary.domain.club.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.persistence.entity.Member;

@Getter
@Setter
@Slf4j
@RequiredArgsConstructor
public class PluralCreateRequest {
	private String clubName;
	@NotNull(message = "그룹 썸네일을 등록해주세요.")
	private MultipartFile thumbnail;

}
