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
	private String profilePath;
	private String intro;
	private Long point;
	private SocialType socialType;
	private String sociaId;

}
