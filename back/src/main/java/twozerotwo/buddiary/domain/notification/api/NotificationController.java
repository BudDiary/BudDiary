package twozerotwo.buddiary.domain.notification.api;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.service.ClubService;
import twozerotwo.buddiary.domain.notification.service.NotificationService;
import twozerotwo.buddiary.global.util.AuthenticationUtil;
import twozerotwo.buddiary.persistence.entity.Member;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/notice")
@Slf4j
public class NotificationController {
	private final NotificationService notificationService;
	private final AuthenticationUtil authenticationUtil;
	public final ClubService clubService;

	@PostMapping("/double/{target}")
	public ResponseEntity notifyDoubleInviteEvent(@PathVariable String target, HttpServletRequest request) {
		// Member inviter = authenticationUtil.getMemberEntityFromRequest(request);
		Member inviter = clubService.returnMemberByUsername("yeokyung502@naver.com");
		notificationService.notifyDoubleInviteEvent(inviter, "yeokyung502@naver.com");
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
