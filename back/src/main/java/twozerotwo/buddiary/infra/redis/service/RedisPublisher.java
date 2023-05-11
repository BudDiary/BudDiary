package twozerotwo.buddiary.infra.redis.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import twozerotwo.buddiary.domain.notification.dto.SseMessageDto;

@RequiredArgsConstructor
@Service
public class RedisPublisher {
	private final RedisTemplate<String, SseMessageDto> redisInviteMessageDtoTemplate;

	public void publishNotification(ChannelTopic topic, SseMessageDto sseMessageDto) {
		System.out.println("[notification]" + topic.getTopic());
		redisInviteMessageDtoTemplate.convertAndSend(topic.getTopic(), sseMessageDto);
	}
}
