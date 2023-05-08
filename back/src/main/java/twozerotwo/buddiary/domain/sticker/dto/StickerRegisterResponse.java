package twozerotwo.buddiary.domain.sticker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StickerRegisterResponse {
	private Long id;
	private String name;
	private String imgUrl;
	private Long price;
}
