package twozerotwo.buddiary.domain.member.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.member.dto.MemberDto;
import twozerotwo.buddiary.domain.member.dto.MemberSignUpRequest;
import twozerotwo.buddiary.global.advice.exception.ConflictException;
import twozerotwo.buddiary.global.util.AuthenticationUtil;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;
	private final AuthenticationUtil authenticationUtil;

	@Transactional
	public MemberDto signUp(MemberSignUpRequest userSignUpDto, HttpServletRequest request) {
		Member memberDtoFromRequest = authenticationUtil.getMemberEntityFromRequest(request);
		if (memberRepository.findByUsername(userSignUpDto.getNickname()).isPresent()) {
			throw new ConflictException("이미 존재하는 유저의 이메일입니다.");
			// 이거 애러가 안나가는데 확인좀
		}
		Member signup = memberDtoFromRequest.signup(userSignUpDto.getNickname());
		return signup.toDto();
	}
}
