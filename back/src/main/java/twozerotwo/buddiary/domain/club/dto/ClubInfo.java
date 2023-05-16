package twozerotwo.buddiary.domain.club.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.persistence.enums.ClubType;

@Getter
@Builder
@Slf4j
@NoArgsConstructor
@AllArgsConstructor
public class ClubInfo {
	private String clubUuid;
	private String thumbnailUrl;
	private String clubName;
	private String captainUsername;
	private ClubType clubType;
}
