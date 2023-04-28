package twozerotwo.buddiary.domain.member.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.member.dto.MemberSignUpDto;
import twozerotwo.buddiary.domain.member.service.MemberService;

@RestController
@Slf4j
@RequestMapping("/api/members")
@AllArgsConstructor
public class MemberController {
	private final MemberService memberService;

	@PostMapping("/sign-up")
	public String signUp(@RequestBody MemberSignUpDto memberSignUpDto) throws Exception {
		memberService.signUp(memberSignUpDto);
		return "회원가입 성공";
	}

	@GetMapping("/jwt-test")
	public String jwtTest() {
		return "jwtTest 요청 성공";
	}

}
