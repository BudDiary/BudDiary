package twozerotwo.buddiary.domain.member.api;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.dto.MemberDto;
import twozerotwo.buddiary.domain.member.dto.MemberSignUpRequest;
import twozerotwo.buddiary.domain.member.service.MemberService;
import twozerotwo.buddiary.global.util.AuthenticationUtil;

@RestController
@Slf4j
@RequestMapping("/api/members")
@AllArgsConstructor
public class MemberController {
	private final MemberService memberService;
	private final AuthenticationUtil authenticationUtil;

	@PostMapping(value = "/signup", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> signUp(@RequestBody MemberSignUpRequest memberSignUpDto, HttpServletRequest request) {
		// public ResponseEntity<?> signUp() {
		try {
			MemberDto memberDto = memberService.signUp(memberSignUpDto, request);
			// 리프래쉬 토큰 발급
			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(memberSignUpDto);

		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return null;

	}

	@GetMapping("/jwt-test")
	public String jwtTest() {
		log.info("jwt-test");
		return "jwtTest 요청 성공";
	}

}
