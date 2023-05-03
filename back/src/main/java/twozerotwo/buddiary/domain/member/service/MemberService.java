package twozerotwo.buddiary.domain.member.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.member.dto.MemberSignUpDto;
import twozerotwo.buddiary.global.advice.exception.NotFoundException;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.enums.Role;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;

	public void signUp(MemberSignUpDto userSignUpDto) throws Exception {

		if (memberRepository.findByUsername(userSignUpDto.getUsername()).isPresent()) {
			throw new NotFoundException("이미 존재하는 유저의 이메일입니다.");
		}

		Member member = Member.builder()
			.username(userSignUpDto.getUsername())
			.password(userSignUpDto.getPassword())
			.role(Role.USER)
			.build();

		member.passwordEncode(passwordEncoder);
		memberRepository.save(member);
	}
}
