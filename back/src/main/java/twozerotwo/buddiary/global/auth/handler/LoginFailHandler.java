package twozerotwo.buddiary.global.auth.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.global.advice.enums.ErrorResponse;

@Slf4j
@AllArgsConstructor
@Component
public class LoginFailHandler extends SimpleUrlAuthenticationFailureHandler {
	private final ObjectMapper objectMapper;

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException exception) throws IOException, ServletException {
		response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/plain;charset=UTF-8");
		// response.getWriter().write("로그인 실패! 이메일이나 비밀번호를 확인해주세요.");
		ErrorResponse errorResponse = new ErrorResponse(401, "소셜 로그인을 실패했습니다.로그를 확인하세요");
		response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
		log.info("로그인에 실패했습니다. 메시지 : {}", exception.getMessage());
	}
}
