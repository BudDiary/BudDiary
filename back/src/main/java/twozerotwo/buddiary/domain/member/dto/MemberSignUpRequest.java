package twozerotwo.buddiary.domain.member.dto;

import javax.validation.constraints.Email;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class MemberSignUpRequest {

	@Email(message = "이메일 양식이 아닙니다.")
	private String username;

}
