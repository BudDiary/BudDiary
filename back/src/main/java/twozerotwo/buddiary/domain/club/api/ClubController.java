package twozerotwo.buddiary.domain.club.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import twozerotwo.buddiary.domain.club.dto.ClubCreateResponse;
import twozerotwo.buddiary.domain.club.dto.DoubleCreateRequest;
import twozerotwo.buddiary.domain.club.dto.PluralCreateRequest;
import twozerotwo.buddiary.domain.club.service.ClubService;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/clubs")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Slf4j
public class ClubController {
	private final ClubService clubService;
	//-------------------------------------------클럽 생성----------------------------------------------
	@PostMapping("/double")
	public ResponseEntity<ClubCreateResponse> createClub(@ModelAttribute DoubleCreateRequest request) {

		return new ResponseEntity<ClubCreateResponse>(clubService.createDouble(request), HttpStatus.CREATED);
	}
	@PostMapping("/plural")
	public ResponseEntity<ClubCreateResponse> createClub(@ModelAttribute PluralCreateRequest request) {

		ClubCreateResponse response = clubService.createPlural(request);

		return null;
	}

}
