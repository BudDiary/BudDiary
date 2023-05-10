package twozerotwo.buddiary.domain.member.api;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.member.dto.MemberDto;
import twozerotwo.buddiary.domain.member.dto.MemberSignUpRequest;
import twozerotwo.buddiary.domain.member.service.MemberService;
import twozerotwo.buddiary.global.advice.exception.ConflictException;

@RestController
@Slf4j
@RequestMapping("/api/members")
@AllArgsConstructor
public class MemberController {
	private final MemberService memberService;

	//-------------------------------------------맴버 회원가입 추가정보 기입----------------------------------------------
	@PostMapping(value = "/signup")
	//리퀘스트 파트
	public ResponseEntity<?> signUp(@Valid MemberSignUpRequest memberSignUpDto,
		HttpServletRequest request) {
		try {
			MemberDto memberDto = memberService.signUp(memberSignUpDto, request);
			return ResponseEntity.ok().body(true);
		} catch (Exception err) {
			err.printStackTrace();
			return ResponseEntity.badRequest().body(err.getMessage());
		}

	}

	//-------------------------------------------맴버 닉네임 변경----------------------------------------------
	@PatchMapping("/nickname")
	public ResponseEntity<?> patchNickname(@RequestBody Map<String, String> nicknameReq, HttpServletRequest request) {

		String nickname = nicknameReq.get("nickname");
		String updatedNickname = memberService.updateNickname(nickname, request).orElseThrow(
			() -> new ConflictException("닉네임 변경을 실패 했습니다.")
		);
		return ResponseEntity.ok(updatedNickname);

	}

	//-------------------------------------------맴버 인트러 변경----------------------------------------------
	@PatchMapping("/intro")
	public ResponseEntity<?> patchIntro(@RequestBody Map<String, String> introReq, HttpServletRequest request) {
		String nickname = introReq.get("intro");
		String updatedNickname = memberService.updateIntro(nickname, request).orElseThrow(
			() -> new ConflictException("소개말 변경을 실패 했습니다.")
		);
		return ResponseEntity.ok(updatedNickname);
	}

	//-------------------------------------------맴버 사진 변경----------------------------------------------
	@PatchMapping("/profile")
	public ResponseEntity<?> patchMemberProfile(MultipartFile inputFile,
		HttpServletRequest request) {
		try {
			String updatedNickname = memberService.updateProfilePath(inputFile, request).orElseThrow(
				() -> new ConflictException("프로파일 변경을 실패 했습니다.")
			);
			return ResponseEntity.ok(updatedNickname);
		} catch (Exception err) {
			err.printStackTrace();
			return ResponseEntity.badRequest().body(err.getMessage());
		}

	}

	//-------------------------------------------테스트----------------------------------------------
	@GetMapping("/jwt-test")
	public String jwtTest() {
		log.info("jwt-test");
		return "jwtTest 요청 성공";
	}

}
