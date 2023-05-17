package twozerotwo.buddiary.infra.redis.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.notification.dto.SseMessageDto;
import twozerotwo.buddiary.persistence.enums.NoticeType;
import twozerotwo.buddiary.persistence.repository.RedisClubWriteRepository;
import twozerotwo.buddiary.persistence.repository.RedisDoubleInviteRepository;

@RequiredArgsConstructor
@Service
@Slf4j
public class RedisPublisher {
	private final RedisTemplate<String, SseMessageDto> redisInviteMessageDtoTemplate;

	private final RedisClubWriteRepository redisClubWriteRepository;
	private final RedisDoubleInviteRepository redisDoubleInviteRepository;

	@KafkaListener(topics = "exam", groupId = "foo")
	public void kafkaListener(String message) throws JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		SseMessageDto sseMessageDto = objectMapper.readValue(message, SseMessageDto.class);
		log.info("publish : " + sseMessageDto.toString());
		if (sseMessageDto.getNotificationDto().getType().equals(NoticeType.DOUBLE_INVITE)) {
			redisInviteMessageDtoTemplate.convertAndSend(
				(redisDoubleInviteRepository.getTopic(NoticeType.DOUBLE_INVITE.getCode())).getTopic(), sseMessageDto);
		} else {
			redisInviteMessageDtoTemplate.convertAndSend(
				(redisClubWriteRepository.getTopic(NoticeType.CLUB_WRITE.getCode())).getTopic(), sseMessageDto);
		}
	}

	public void publishNotification(ChannelTopic topic, SseMessageDto sseMessageDto) {
		redisInviteMessageDtoTemplate.convertAndSend(topic.getTopic(), sseMessageDto);
	}
}
