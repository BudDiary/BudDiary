package twozerotwo.buddiary.domain.sticker.dto;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StickerBuyRequest {
	@NotNull(message = "스티커 아이디를 입력해주세요.")
	private Long stickerId;
	@NotNull(message = "스티커 수량을 입력해주세요.")
	private Long count;
	private String username;
}
