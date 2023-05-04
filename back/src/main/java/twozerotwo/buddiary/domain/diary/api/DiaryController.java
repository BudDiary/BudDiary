package twozerotwo.buddiary.domain.diary.api;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.diary.dto.DiaryPostRequest;
import twozerotwo.buddiary.domain.diary.dto.SimpleDiaryDto;
import twozerotwo.buddiary.domain.diary.service.DiaryService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/diaries")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Slf4j
public class DiaryController {
	private final DiaryService diaryService;

	//----------------------------------------------다이어리 작성------------------------------------------------
	@PostMapping
	public ResponseEntity createDiary(@ModelAttribute DiaryPostRequest request) throws IOException {
		List<String> clubList = request.getClubList();
		Boolean isSelected = false;
		if (request.getClubList().size() > 0) {
			isSelected = true;
			for (String clubUuid : clubList) {
				diaryService.createClubDiary(request, clubUuid);
			}
		}
		if (request.getIsPersonal()) {
			isSelected = true;
			diaryService.createPersonalDiary(request);
		}
		if (!isSelected) {
			throw new RuntimeException("ff");
		} else {
			diaryService.minusStickerCnt(request);
		}
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	//-------------------------------------------특정 날짜 다이어리 리스트 반환----------------------------------------------
	@GetMapping
	public ResponseEntity getDayDiaryList(@RequestParam("date") String date) {
		String username = "yeokyung";
		List<SimpleDiaryDto> simpleDiaryList = diaryService.getDayDiaryList(username, date); // 해당 월에 쓴 다이어리 날짜들 조회
		return ResponseEntity.ok(Map.of("dairyList", simpleDiaryList));
	}
}
