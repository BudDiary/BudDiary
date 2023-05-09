package twozerotwo.buddiary.domain.member.api;

import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

	@PatchMapping("/nickname")
	public ResponseEntity<?> patchNickname(@RequestBody Map<String, String> nicknameReq, HttpServletRequest request) {

		String nickname = nicknameReq.get("nickname");
		String updatedNickname = memberService.updateNickname(nickname, request).orElseThrow(
			() -> new ConflictException("닉네임 변경을 실패 했습니다.")
		);
		return ResponseEntity.ok(updatedNickname);

	}

	@GetMapping("/jwt-test")
	public String jwtTest() {
		log.info("jwt-test");
		return "jwtTest 요청 성공";
	}

}
