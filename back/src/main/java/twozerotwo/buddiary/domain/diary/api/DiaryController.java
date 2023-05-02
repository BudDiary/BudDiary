package twozerotwo.buddiary.domain.diary.api;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.diary.dto.DiaryPostRequest;
import twozerotwo.buddiary.domain.diary.dto.DiaryPostResponse;
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
		if (request.getClubList().size() > 0) {
			for (String clubUuid : clubList) {
				diaryService.createClubDiary(request, clubUuid);
			}
		}
		if (request.getIsPersonal()) {
			diaryService.createPersonalDiary(request);
		}
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
}
