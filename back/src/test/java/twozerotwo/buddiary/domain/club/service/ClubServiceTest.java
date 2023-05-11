package twozerotwo.buddiary.domain.club.service;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Transactional
class ClubServiceTest {

	@Autowired
	private ClubService clubService;

	@Test
	void addMember() {
	}
}
