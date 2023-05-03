package twozerotwo.buddiary.domain.club.dto;

import java.util.List;

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
public class MyClubDto {
	private List<ClubDto> pluralList;
	private List<ClubDto> doubleList;
}
