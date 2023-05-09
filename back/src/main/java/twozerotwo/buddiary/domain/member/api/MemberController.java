package twozerotwo.buddiary.domain.member.api;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.member.dto.MemberDto;
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

	@GetMapping("/jwt-test")
	public String jwtTest() {
		log.info("jwt-test");
		return "jwtTest 요청 성공";
	}

}
