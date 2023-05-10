package twozerotwo.buddiary.domain.notification.service;

import static twozerotwo.buddiary.domain.notification.api.SseController.*;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.service.ClubService;
import twozerotwo.buddiary.domain.notification.dto.InviteMessageDto;
import twozerotwo.buddiary.domain.notification.dto.NotificationDto;
import twozerotwo.buddiary.infra.redis.service.RedisPublisher;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.entity.Notification;
import twozerotwo.buddiary.persistence.enums.NoticeType;
import twozerotwo.buddiary.persistence.repository.NotificationRepository;
import twozerotwo.buddiary.persistence.repository.RedisDoubleInviteRepository;

@RequiredArgsConstructor
@Service
@Slf4j
public class NotificationService {
	private final NotificationRepository notificationRepository;
	private final ClubService clubService;
	private final RedisPublisher redisPublisher;
	private final RedisDoubleInviteRepository redisDoubleInviteRepository;

	public void notifyDoubleInviteEvent(Member inviter, String targetName) {
		Member target = clubService.returnMemberByUsername(targetName);
		// DB 저장
		Notification notification = Notification.builder()
			.type(NoticeType.DOUBLE_INVITE)
			.receiver(target)
			.senderM(inviter.getUsername())
			.build();
		Notification savedNotice = notificationRepository.save(notification);
		// 쏴주기
		Long targetId = target.getId();
		if (sseEmitters.containsKey(targetId)) {
			log.info("[targetId]" + targetId);
			// 이 객체를 레디스 템플릿으로 보낸다..?
			SseEmitter sseEmitter = sseEmitters.get(targetId);
			NotificationDto notificationDto = savedNotice.toDto();
			InviteMessageDto inviteMessageDto = InviteMessageDto.builder()
				.notificationDto(notificationDto)
				.sseEmitter(sseEmitter)
				.userId(targetId)
				.build();
			redisPublisher.publishNotification(redisDoubleInviteRepository.getTopic(NoticeType.DOUBLE_INVITE.getCode()), inviteMessageDto);
			// try {
			// 	sseEmitter.send(SseEmitter.event().name("DOUBLE_INVITE").data(inviteMessageDto.getNotificationDto()));
			// 	// sseEmitter.send(SseEmitter.event().name("message").data("ㅎㅎㄹ"));
			// 	log.info("여기 맞아");
			// 	// sseEmitter.send(SseEmitter.event().name("connect").data("연결 완료2"));
			// } catch (Exception e) {
			// 	log.info("여기 아니야");
			// 	log.info("error : " + e);
			// 	sseEmitters.remove(targetId);
			// }

		}


	}
}
