package twozerotwo.buddiary.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import twozerotwo.buddiary.global.oauth.dto.SocialType;

@Builder
@AllArgsConstructor
@Getter
@NoArgsConstructor
public class MemberDto {

	private String username;
	@Builder.Default
	private String nickname = null;
	private String profilePath;
	private String intro;
	private Long point;
	private SocialType socialType;
	private String socialId;
	@Builder.Default
	private String gender = null;
	@Builder.Default
	private String ageRange = null;

	public GetMemberDetailResponse toGetMemberDetailResponse() {
		return GetMemberDetailResponse.builder()
			.nickname(this.nickname)
			.imgUrl(this.profilePath)
			.ageRange(this.ageRange)
			.gender(this.gender)
			.build();
	}
}
