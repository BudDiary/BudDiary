package twozerotwo.buddiary.domain.notification.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.service.ClubService;
import twozerotwo.buddiary.global.advice.exception.BadRequestException;
import twozerotwo.buddiary.global.util.AuthenticationUtil;
import twozerotwo.buddiary.infra.redis.service.RedisPublisher;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.entity.Notification;
import twozerotwo.buddiary.persistence.repository.NotificationRepository;
import twozerotwo.buddiary.persistence.repository.RedisDoubleInviteRepository;

@RequiredArgsConstructor
@Service
@Slf4j
public class NotificationService {
	private final NotificationRepository notificationRepository;
	private final ClubService clubService;
	private final AuthenticationUtil authenticationUtil;
	public List<Notification> getAllNotification(HttpServletRequest servlet) {
		Member member = authenticationUtil.getMemberEntityFromRequest(servlet);
		// Member member = clubService.returnMemberByUsername(username);
		List<Notification> notifications = notificationRepository.findByReceiverAndIsChecked(member, false);
		return notifications;
	}

	@Transactional
	public void deleteNotification(Long noticeId, HttpServletRequest servlet) {
		Member member = authenticationUtil.getMemberEntityFromRequest(servlet);
		// Member member = clubService.returnMemberByUsername(username);
		Notification notification = notificationRepository.findById(noticeId)
			.orElseThrow(() -> new BadRequestException("해당 알림을 찾을 수 없습니다."));
		if (notification.getIsChecked().equals(true)) {
			throw new BadRequestException("이미 확인한 알람입니다.");
		}
		if (!notification.getReceiver().equals(member)) {
			throw new BadRequestException("자신의 알림이 아닌 것은 지울 수 없습니다.");
		}
		notification.changeState();
		notificationRepository.save(notification);
	}
}
