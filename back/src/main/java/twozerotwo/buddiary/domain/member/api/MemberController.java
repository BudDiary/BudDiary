package twozerotwo.buddiary.domain.member.api;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
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

	@PostMapping(value = "/signup")
	public ResponseEntity<?> signUp(@RequestBody @Valid MemberSignUpRequest memberSignUpDto, HttpServletRequest request) {
		MemberDto memberDto = memberService.signUp(memberSignUpDto, request);
		log.info(memberSignUpDto.getUsername());
		// 리프래쉬 토큰 발급
		// memberService.signUp(memberSignUpDto);
		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(true);
	}

	@GetMapping("/jwt-test")
	public String jwtTest() {
		log.info("jwt-test");
		return "jwtTest 요청 성공";
	}

}
