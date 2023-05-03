package twozerotwo.buddiary.domain.club.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Getter
@Builder
@Slf4j
@NoArgsConstructor
@AllArgsConstructor
public class ClubDto {
	private String clubUuid;
	private String thumbnailUrl;
	private String name;
}
