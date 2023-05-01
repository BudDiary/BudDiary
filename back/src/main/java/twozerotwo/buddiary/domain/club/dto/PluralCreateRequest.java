package twozerotwo.buddiary.domain.club.dto;

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
	private String name;
	private MultipartFile thumbnail;

}
