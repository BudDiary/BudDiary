package twozerotwo.buddiary.domain.member.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@Slf4j
@NoArgsConstructor
public class MemberSignUpRequest {
	@Size(max = 8, min = 2, message = "2자 이상 8 이하로 username 을 작성하세요")
	@NotBlank(message = "nickname 이 비어 있습니다.")
	private String nickname;

	private MultipartFile profilePic;
}
