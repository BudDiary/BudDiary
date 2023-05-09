package twozerotwo.buddiary.domain.club.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Builder
@Slf4j
@NoArgsConstructor
@AllArgsConstructor
public class ClubCreateResponse {
	private String type;
	private String uuid;
}
