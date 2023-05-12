package twozerotwo.buddiary.domain.sticker.api;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.sticker.dto.StickerBuyRequest;
import twozerotwo.buddiary.domain.sticker.dto.StickerRegisterRequest;
import twozerotwo.buddiary.domain.sticker.service.StickerService;
import twozerotwo.buddiary.persistence.entity.Sticker;
import twozerotwo.buddiary.persistence.entity.UnusedSticker;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/stickers")
@Slf4j
public class StickerController {
	private final StickerService stickerService;

	//---------------------------------------------------스티커 등록----------------------------------------------------
	@PostMapping
	public ResponseEntity<Sticker> registerSticker(@ModelAttribute StickerRegisterRequest request) throws IOException {

		Sticker response = stickerService.registerSticker(request);
		return new ResponseEntity<Sticker>(response, HttpStatus.CREATED);
	}

	//---------------------------------------------------스티커 구매----------------------------------------------------
	@PostMapping("/{stickerId}")
	public ResponseEntity buySticker(@PathVariable Long stickerId, @RequestBody StickerBuyRequest request,
		HttpServletRequest servlet) {
		stickerService.buySticker(stickerId, request, servlet);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	//---------------------------------------------------모든 스티커 조회----------------------------------------------------
	@GetMapping
	public ResponseEntity getAllSticker() {
		List<Sticker> stickerList = stickerService.getAllSticker();
		return new ResponseEntity<>(Map.of("stickerList", stickerList), HttpStatus.OK);
	}

	//---------------------------------------------------나의 스티커 조회----------------------------------------------------
	@GetMapping("/mine")
	public ResponseEntity getMineSticker(HttpServletRequest servlet) {
		List<UnusedSticker> myStickerList = stickerService.getMineSticker(servlet);
		return new ResponseEntity<>(Map.of("myStickerList", myStickerList), HttpStatus.OK);
	}
}
