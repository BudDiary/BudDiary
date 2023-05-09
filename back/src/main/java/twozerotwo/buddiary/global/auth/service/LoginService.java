package twozerotwo.buddiary.global.auth.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

/**
 * 유저 디테일의 역활
 * 1. 유저를 담은 유저 디테일을 반환
 * 2. 디비에 유저를 가져온다
 */

@Service
@RequiredArgsConstructor
@Slf4j
public class LoginService implements UserDetailsService {
	private final MemberRepository memberRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Member member = memberRepository.findByUsername(username)
			.orElseThrow(() -> new UsernameNotFoundException("해당 이메일이 존재하지 않습니다"));
		return User.builder()
			.username(member.getUsername())
			.password(member.getPassword())
			.roles(member.getRole().name())
			.build();
	}
}
