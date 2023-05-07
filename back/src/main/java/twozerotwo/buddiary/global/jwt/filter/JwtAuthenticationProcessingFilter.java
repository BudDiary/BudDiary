package twozerotwo.buddiary.global.jwt.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.global.jwt.service.JwtService;
import twozerotwo.buddiary.global.jwt.util.PasswordUtil;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

/**
 * 토큰 검사 재발급 실행하는 필터
 */
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {

	private static final String NO_CHECK_URL = "login"; // "/login"으로 들어오는 요청은 Filter 작동 X

	private final JwtService jwtService;
	private final MemberRepository memberRepository;

	private GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {
		// "/login"으로 들어오는 요청은 Filter 작동 X 로그인 의경우 토큰 유효성이 아니라 인증인가를 바로 하면됨
		if (request.getRequestURI().equals(NO_CHECK_URL)) {
			log.info("다음필터로 보냅니다.");
			filterChain.doFilter(request, response);
			return;
		}

		/**
		 * 사용자 요청 헤더에서 RefreshToken 추출
		 *  -> RefreshToken이 없거나 유효하지 않다면(DB에 저장된 RefreshToken과 다르다면) null을 반환
		 *  사용자의 요청 헤더에 RefreshToken이 있는 경우는, AccessToken이 만료되어 요청한 경우밖에 없다.
		 *  따라서, 위의 경우를 제외하면 추출한 refreshToken은 모두 null
		 */
		String refreshToken = jwtService.extractRefreshToken(request).filter(jwtService::isTokenValid).orElse(null);
		String accessToken = jwtService.extractAccessToken(request).filter(jwtService::isTokenValid).orElse(null);

		// Member extractMember = memberRepository.findByUsername(userName).orElse(null);
		// log.info("userName {} ",extractMember.getUsername() == null);

		/**
		 *리프레시 토큰이 요청 쿠키에 존재했다면, 사용자가 AccessToken이 만료되어서
		 * RefreshToken까지 보낸 것이므로 리프레시 토큰이 DB의 리프레시 토큰과 일치하는지 판단 후,
		 * 일치한다면 AccessToken을 재발급해준다.
		 */

		if (refreshToken != null) {
			filterChain.doFilter(request, response);
			return; // RefreshToken을 보낸 경우에는 AccessToken을 재발급 하고 인증 처리는 하지 않게 하기위해 바로 return으로 필터 진행 막기
		}
		/**
		 * RefreshToken이 없거나 유효하지 않다면, AccessToken을 검사하고 인증을 처리하는 로직 수행
		 * AccessToken이 없거나 유효하지 않다면, 인증 객체가 담기지 않은 상태로 다음 필터로 넘어가기 때문에 403 에러 발생
		 * AccessToken이 유효하다면, 인증 객체가 담긴 상태로 다음 필터로 넘어가기 때문에 인증 성공
		 *
		 * 리프래쉬가 널이이고 디비에서 찾은 회원이 없다면
		 * */

		if (refreshToken == null) {
			log.info("리프레쉬 토큰이 널임이고 디비에 정보가 없습니다 .");
			checkAccessTokenAndAuthentication(request, response, filterChain);
		}

	}

	/**
	 * [리프레시 토큰으로 유저 정보 찾기 & 액세스 토큰/리프레시 토큰 재발급 메소드]
	 * 파라미터로 들어온 헤더에서 추출한 리프레시 토큰으로 DB에서 유저를 찾고, 해당 유저가 있다면
	 * JwtService.createAccessToken()으로 AccessToken 생성,
	 * reIssueRefreshToken()로 리프레시 토큰 재발급 & DB에 리프레시 토큰 업데이트 메소드 호출
	 * 그 후 JwtService.sendAccessTokenAndRefreshToken()으로 응답 헤더에 보내기
	 */
	public void checkRefreshTokenAndReIssueAccessToken(HttpServletResponse response, String refreshToken) {
		memberRepository.findByRefreshToken(refreshToken).ifPresent(member -> {
			String reIssuedRefreshToken = reIssueRefreshToken(member);
			jwtService.sendAccessAndRefreshToken(response, jwtService.createAccessToken(member.getUsername()),
				reIssuedRefreshToken);
		});
	}

	private String reIssueRefreshToken(Member member) {
		String reIssuedRefreshToken = jwtService.createRefreshToken();
		member.updateRefreshToken(reIssuedRefreshToken);
		memberRepository.saveAndFlush(member);
		return reIssuedRefreshToken;
	}

	public void checkAccessTokenAndAuthentication(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {
		log.info("accessToken 유효 확인 유저 정보를 디비에서 빼오고 있다면 컨텍스트에 UserDetail 로 저장다음필터로 넘깁니다.");

		jwtService.extractAccessToken(request)
			.filter(jwtService::isTokenValid)
			.ifPresent(accessToken -> jwtService.extractUserName(accessToken)
				.ifPresent(userName -> memberRepository.findByUsername(userName).ifPresent(this::saveAuthentication)));
		// 다음 필터로 넘어간다.
		filterChain.doFilter(request, response);
	}

	public void saveAuthentication(Member myUser) {
		String password = myUser.getPassword();
		if (password == null) { // 소셜 로그인 유저의 비밀번호 임의로 설정 하여 소셜 로그인 유저도 인증 되도록 설정
			password = PasswordUtil.generateRandomPassword();
		}

		UserDetails userDetailsUser = User.builder()
			.username(myUser.getUsername())
			.password(password)
			.roles(myUser.getRole().name())
			.build();

		Authentication authentication = new UsernamePasswordAuthenticationToken(userDetailsUser, null,
			authoritiesMapper.mapAuthorities(userDetailsUser.getAuthorities()));

		//시큐리티 컨텍스트에 저장
		SecurityContextHolder.getContext().setAuthentication(authentication);
	}
}
