package twozerotwo.buddiary.global.auth.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.global.auth.service.JwtTokenProvider;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends GenericFilterBean {
	// GenericFilterBean  인 이유
	private final JwtTokenProvider jwtTokenProvider;

	/**
	 * jwt 필터 입력받은 토큰 유효성을 검사
	 *
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws
		IOException,
		ServletException {
		log.info(" doFilterInternal 필터 수행");
		// 토큰 추출
		String token = resolveToken((HttpServletRequest)request);
		// 유효성 검사
		if (token != null && jwtTokenProvider.validationToken(token)) {
			Authentication authentication = jwtTokenProvider.getAuthentication(token);
			// 시큐리티 컨텍스트 홀더에 저장
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
		chain.doFilter(request, response);
	}

	/**
	 * 토큰 추출하는 함수
	 *
	 * @param request
	 * @return
	 */
	private String resolveToken(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
			return bearerToken.substring(7);
		}
		return null;
	}
}
