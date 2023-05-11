package twozerotwo.buddiary.domain.notification.service;

import static twozerotwo.buddiary.domain.notification.api.SseController.*;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.service.ClubService;
import twozerotwo.buddiary.domain.notification.dto.SseMessageDto;
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
			// 이 객체를 레디스 템플릿으로 보낸다..?
		// if (redisSseEntityRepository.existsById(targetId)) {
			SseMessageDto sseMessageDto = SseMessageDto.builder()
				.notificationDto(savedNotice.toDto())
				.targetId(targetId)
				.build();
			redisPublisher.publishNotification(redisDoubleInviteRepository.getTopic(NoticeType.DOUBLE_INVITE.getCode()),
				sseMessageDto);
		}
	}
}
