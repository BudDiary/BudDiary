package twozerotwo.buddiary.domain.sticker.api;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.sticker.dto.StickerRegisterRequest;
import twozerotwo.buddiary.domain.sticker.service.StickerService;
import twozerotwo.buddiary.persistence.entity.Sticker;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/stickers")
@Slf4j
public class StickerController {
	//---------------------------------------------------스티커 등록----------------------------------------------------
	private final StickerService stickerService;

	@PostMapping
	public ResponseEntity<Sticker> registerSticker(@ModelAttribute StickerRegisterRequest request) throws IOException {
		log.info("ㅎㅎ");
		Sticker response = stickerService.registerSticker(request);
		return new ResponseEntity<Sticker>(response, HttpStatus.CREATED);
	}

}
