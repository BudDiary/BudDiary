package twozerotwo.buddiary.global.oauth.hadler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.global.advice.enums.ErrorResponse;

@Slf4j
@Component
@AllArgsConstructor
public class OAuth2LoginFailHandler implements AuthenticationFailureHandler {
	private final ObjectMapper objectMapper;

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException exception) throws IOException, ServletException {
		response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		ErrorResponse errorResponse = new ErrorResponse(401, "소셜 로그인을 실패했습니다.로그를 확인하세요");
		response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
		exception.printStackTrace();
		log.info("소셜 로그인에 실패했습니다. 에러 메시지 : {}", exception.getMessage());
	}
}
