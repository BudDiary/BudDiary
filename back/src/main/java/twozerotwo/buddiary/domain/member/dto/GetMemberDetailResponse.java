package twozerotwo.buddiary.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
@Setter
@NoArgsConstructor
public class GetMemberDetailResponse {

	private String username;
	private String imgUrl;
	private String gender;
	private String ageRange;
}
