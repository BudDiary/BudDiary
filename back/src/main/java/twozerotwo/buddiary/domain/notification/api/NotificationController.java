package twozerotwo.buddiary.domain.notification.api;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.service.ClubService;
import twozerotwo.buddiary.domain.notification.service.NotificationService;
import twozerotwo.buddiary.global.util.AuthenticationUtil;
import twozerotwo.buddiary.persistence.entity.Notification;

@RequiredArgsConstructor
@RestController
@RequestMapping
@Slf4j
public class NotificationController {
	private final NotificationService notificationService;
	private final AuthenticationUtil authenticationUtil;
	public final ClubService clubService;

	//----------------------------------------------나의 알림 조회-----------------------------------------------
	@GetMapping("/api/notices")
	public ResponseEntity getAllNotification(HttpServletRequest servlet) {

		List<Notification> noticeList = notificationService.getAllNotification(servlet);
		return new ResponseEntity<>(Map.of("noticeList", noticeList), HttpStatus.OK);
	}

	//-------------------------------------------나의 알림 삭제-----------------------------------------------
	@DeleteMapping("/api/notices/{noticeId}")
	public ResponseEntity deleteNotification(@PathVariable Long noticeId, HttpServletRequest servlet) {
		notificationService.deleteNotification(noticeId, servlet);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
