package twozerotwo.buddiary.domain.member.dto;

import javax.validation.constraints.Email;

import com.fasterxml.jackson.annotation.JsonProperty;

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
public class GetMemberDetailRequest {
	@Email(message = "이메일 양식이 아닙니다.")
	@JsonProperty("member_id")
	private String username;
}
