package twozerotwo.buddiary.domain.diary.api;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.diary.dto.DiaryPostRequest;
import twozerotwo.buddiary.domain.diary.dto.SimpleDiaryDto;
import twozerotwo.buddiary.domain.diary.dto.StickerToDiaryDto;
import twozerotwo.buddiary.domain.diary.dto.UsedStickerDto;
import twozerotwo.buddiary.domain.diary.service.DiaryService;
import twozerotwo.buddiary.global.advice.exception.BadRequestException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/diaries")
@Slf4j
public class DiaryController {
	private final DiaryService diaryService;

	//----------------------------------------------다이어리 작성------------------------------------------------
	@PostMapping
	public ResponseEntity createDiary(@ModelAttribute DiaryPostRequest request, HttpServletRequest servlet) throws
		IOException {
		List<String> clubList = request.getClubList();
		Boolean isSelected = false;
		if (request.getClubList().size() > 0 && request.getClubList() != null) {
			isSelected = true;
			for (String clubUuid : clubList) {
				diaryService.createClubDiary(request, clubUuid, servlet);
			}
		}
		if (request.getIsPersonal()) {
			isSelected = true;
			diaryService.createPersonalDiary(request, servlet);
		}
		if (!isSelected) {
			throw new BadRequestException("다이어리를 작성할 위치가 작성되지 않았습니다.");
		} else {
			diaryService.minusStickerCnt(request, servlet);
		}
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	//-------------------------------------------특정 날짜 다이어리 리스트 반환----------------------------------------------
	@GetMapping
	public ResponseEntity getDayDiaryList(@RequestParam("date") String date,
		HttpServletRequest servlet) {
		List<SimpleDiaryDto> simpleDiaryList = diaryService.getDayDiaryList(servlet, date); // 해당 월에 쓴 다이어리 날짜들 조회
		return ResponseEntity.ok(Map.of("diaryList", simpleDiaryList));
	}

	//-------------------------------------------다이어리 상세(스티커)----------------------------------------------
	@GetMapping("/{diaryId}")
	public ResponseEntity getDiarySticker(@PathVariable Long diaryId) {
		return ResponseEntity.ok(Map.of("usedStickers", diaryService.getDiarySticker(diaryId)));
	}

	//-------------------------------------------다이어리 삭제----------------------------------------------
	@DeleteMapping("/{diaryId}")
	public ResponseEntity deleteDiary(@PathVariable Long diaryId, HttpServletRequest servlet) {
		diaryService.deleteDiary(diaryId, servlet);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);

	}

	//---------------------------------------다이어리에 스티커 추가------------------------------------------
	@PatchMapping("/stickers")
	public ResponseEntity addStickerToDiary(@RequestBody @Valid StickerToDiaryDto request, HttpServletRequest servlet) {
		List<UsedStickerDto> usedStickers = diaryService.addStickerToDiary(request, servlet);
		return new ResponseEntity<>(Map.of("usedStickers", usedStickers), HttpStatus.OK);

	}

}
