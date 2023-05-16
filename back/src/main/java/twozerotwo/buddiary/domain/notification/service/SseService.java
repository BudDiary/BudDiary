package twozerotwo.buddiary.domain.notification.service;

import static twozerotwo.buddiary.domain.notification.api.SseController.*;

import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.service.ClubService;
import twozerotwo.buddiary.domain.notification.dto.SseMessageDto;
import twozerotwo.buddiary.global.advice.exception.BadRequestException;
import twozerotwo.buddiary.infra.kafka.service.KafkaProducer;
import twozerotwo.buddiary.infra.redis.service.RedisPublisher;
import twozerotwo.buddiary.persistence.entity.Club;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.entity.MemberClub;
import twozerotwo.buddiary.persistence.entity.Notification;
import twozerotwo.buddiary.persistence.enums.NoticeType;
import twozerotwo.buddiary.persistence.repository.MemberClubRepository;
import twozerotwo.buddiary.persistence.repository.NotificationRepository;
import twozerotwo.buddiary.persistence.repository.RedisClubWriteRepository;
import twozerotwo.buddiary.persistence.repository.RedisDoubleInviteRepository;

@RequiredArgsConstructor
@Service
@Slf4j
public class SseService {
	private final NotificationRepository notificationRepository;
	private final ClubService clubService;
	private final RedisPublisher redisPublisher;
	private final RedisDoubleInviteRepository redisDoubleInviteRepository;
	private final RedisClubWriteRepository redisClubWriteRepository;
	private final MemberClubRepository memberClubRepository;
	private final KafkaProducer kafkaProducer;

	@Transactional
	public void notifyDoubleInviteEvent(Member inviter, String targetName) {
		Member target = clubService.returnMemberByUsername(targetName);
		// DB 저장
		Notification notification = Notification.builder()
			.type(NoticeType.DOUBLE_INVITE)
			.receiver(target)
			.username(inviter.getUsername())
			.nickname(inviter.getNickname())
			.build();
		Notification savedNotice = notificationRepository.save(notification);

		// 쏴주기
		Long targetId = target.getId();
		if (sseEmitters.containsKey(targetId)) {
			// 이 객체를 레디스 템플릿으로 보낸다..? (kafka)
			SseMessageDto sseMessageDto = SseMessageDto.builder()
				.notificationDto(savedNotice.toDto())
				.targetId(targetId)
				.build();
			kafkaProducer.sendMessage(sseMessageDto);
		}
	}

	@Transactional
	public void notifyNewDiaryInClub(Member member, String clubUuid) {
		Club club = clubService.returnClubById(clubUuid);
		Set<MemberClub> clubMembers = club.getClubMembers();
		MemberClub foundMemberClub = memberClubRepository.findMemberClubByClubAndMember(club, member).orElse(null);
		if (foundMemberClub == null) {
			throw new BadRequestException("클럽원의 요청이 아닙니다.");
		}
		for (MemberClub memberClub : clubMembers) {
			Member target = memberClub.getMember();
			Notification notification = Notification.builder()
				.type(NoticeType.CLUB_WRITE)
				.clubName(club.getName())
				.clubUuid(clubUuid)
				.receiver(target)
				.username(member.getUsername())
				.nickname(member.getNickname())
				.build();
			Notification savedNotice = notificationRepository.save(notification);
			// 쏴주기
			Long targetId = target.getId();
			if (sseEmitters.containsKey(targetId)) {
				// 이 객체를 레디스 템플릿으로 보낸다..?
				SseMessageDto sseMessageDto = SseMessageDto.builder()
					.notificationDto(savedNotice.toDto())
					.targetId(targetId)
					.build();
				kafkaProducer.sendMessage(sseMessageDto);
			}

		}

	}
}
