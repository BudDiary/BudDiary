package twozerotwo.buddiary.domain.diary.dto;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DoubleInviteDto {
	@NotBlank(message = "초대 상대의 유저네임을 입력해주세요.")
	private String targetUsername;
}
