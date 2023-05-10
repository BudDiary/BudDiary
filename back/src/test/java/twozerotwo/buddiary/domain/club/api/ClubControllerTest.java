package twozerotwo.buddiary.domain.club.api;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import twozerotwo.buddiary.annotaion.WithAuthUser;
import twozerotwo.buddiary.domain.member.api.MemberController;
import twozerotwo.buddiary.domain.member.service.MemberService;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

@SpringBootTest
@AutoConfigureMockMvc
public class ClubControllerTest {
	@Autowired
	private MockMvc mockMvc;


	@Test
	@WithAuthUser(username = "kroce@naver.com", role = "USER")
	// TODO: 2023/05/10 유저 방식 oauth로 변경 
	public void jwtTest() throws Exception{
		mockMvc.perform(MockMvcRequestBuilders.get("/api/members/jwt-test"))
			.andExpect(status().isOk())
			.andExpect(content().string("jwtTest 요청 성공"))
			.andDo(print());
	}

}
