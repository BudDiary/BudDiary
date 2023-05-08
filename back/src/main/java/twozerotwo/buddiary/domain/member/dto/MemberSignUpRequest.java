package twozerotwo.buddiary.domain.member.dto;

import javax.validation.constraints.Email;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@Slf4j
@NoArgsConstructor
public class MemberSignUpRequest {

	// @Email(message = "이메일 양식이 아닙니다.")
	private String username;

	public MemberSignUpRequest(String username) {
		this.username = username;
	}
}
