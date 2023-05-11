package twozerotwo.buddiary.domain.club.api;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import twozerotwo.buddiary.domain.club.dto.ClubCreateResponse;
import twozerotwo.buddiary.domain.club.dto.ClubDetail;
import twozerotwo.buddiary.domain.club.dto.DoubleCreateRequest;
import twozerotwo.buddiary.domain.club.dto.MyClubDto;
import twozerotwo.buddiary.domain.club.dto.PluralCreateRequest;
import twozerotwo.buddiary.domain.club.service.ClubService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/clubs")
@Slf4j
public class ClubController {
	private final ClubService clubService;

	//-------------------------------------------클럽 생성----------------------------------------------
	@PostMapping("/double")
	public ResponseEntity<ClubCreateResponse> createDoubleClub(@RequestBody DoubleCreateRequest request) {

		return new ResponseEntity<ClubCreateResponse>(clubService.createDouble(request), HttpStatus.CREATED);
	}

	@PostMapping("/plural")
	public ResponseEntity<ClubCreateResponse> createPluralClub(
		@ModelAttribute @Valid PluralCreateRequest request) throws
		IOException {

		return new ResponseEntity<ClubCreateResponse>(clubService.createPlural(request), HttpStatus.CREATED);
	}

	//-------------------------------------------내가 속한 클럽 조회----------------------------------------------
	@GetMapping
	public ResponseEntity getMyClub(@RequestParam("username") String username) {
		MyClubDto myClubDto = clubService.getMyClub(username);
		return new ResponseEntity<>(Map.of("myClubList", myClubDto), HttpStatus.OK);
	}

	//-------------------------------------------클럽 디테일----------------------------------------------
	@GetMapping("/{clubId}/{username}")
	public ResponseEntity getClubDetail(@PathVariable("clubId") String clubUuid, @PathVariable String username) {
		ClubDetail clubDetail = clubService.getClubDetail(clubUuid, username);
		return new ResponseEntity<>(Map.of("clubDetail", clubDetail), HttpStatus.OK);
	}

	//------------------------------------------클럽 나가기----------------------------------------------
	@DeleteMapping("/{clubId}/{username}")
	public ResponseEntity deleteMemberAtClub(@PathVariable("clubId") String clubUuid, @PathVariable String username) {
		clubService.deleteMemberAtClub(clubUuid, username);
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}

	//------------------------------------------클럽 초대 링크 수신----------------------------------------------
	@PostMapping("/invitation")
	public ResponseEntity inviteClub(HttpServletRequest request, @RequestBody Map<String, String> clubIdReq) {
		// 로그인 거치고 이 api를 받는다
		// 할당하는 서비스
		String clubId = clubIdReq.get("clubId");
		clubService.addMember(request, clubId);
		return ResponseEntity.ok().body(true);
	}

}
