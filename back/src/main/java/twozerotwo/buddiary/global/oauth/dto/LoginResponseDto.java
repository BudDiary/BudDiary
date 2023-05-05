package twozerotwo.buddiary.global.oauth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class LoginResponseDto {
	private String username;
	private String nickname;
	private String profilePic;
	private Long points;
	private String intro;
}
