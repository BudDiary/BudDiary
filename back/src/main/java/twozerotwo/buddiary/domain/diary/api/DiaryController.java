package twozerotwo.buddiary.domain.diary.api;

import java.io.IOException;

import javax.validation.Valid;

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
	public ResponseEntity<DiaryPostResponse> createDiary(@ModelAttribute DiaryPostRequest request) throws IOException {
		DiaryPostResponse response = diaryService.createDiary(request);
		return ResponseEntity.ok().body(response);
	}
}
