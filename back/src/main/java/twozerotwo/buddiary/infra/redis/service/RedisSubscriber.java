package twozerotwo.buddiary.infra.redis.service;

import static twozerotwo.buddiary.domain.notification.api.SseController.*;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.notification.dto.SseMessageDto;
import twozerotwo.buddiary.persistence.enums.NoticeType;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber implements MessageListener {
	private final ObjectMapper objectMapper;
	private final RedisTemplate redisTemplate;

	@Override
	public void onMessage(Message message, byte[] pattern) {
		try {
			String topic = (String)redisTemplate.getStringSerializer().deserialize(message.getChannel());
			String publishMessage = (String)redisTemplate.getStringSerializer().deserialize(message.getBody());
			SseMessageDto sseMessageDto = objectMapper.readValue(publishMessage, SseMessageDto.class);
			SseEmitter sseEmitter = sseEmitters.get(sseMessageDto.getTargetId());

			if (topic.equals(NoticeType.DOUBLE_INVITE.getCode())) {
				// SseEmitter sseEmitter = sseEmitters.get(sseMessageDto.getTargetId());
				try {
					sseEmitter.send(SseEmitter.event()
						.name(NoticeType.DOUBLE_INVITE.getCode())
						.data(sseMessageDto.getNotificationDto()));
				} catch (Exception e) {
					sseEmitters.remove(sseMessageDto.getTargetId());
				}
			} else if (topic.equals(NoticeType.CLUB_WRITE.getCode())) {
				try {
					sseEmitter.send(SseEmitter.event()
						.name(NoticeType.CLUB_WRITE.getCode())
						.data(sseMessageDto.getNotificationDto()));
				} catch (Exception e) {
					sseEmitters.remove(sseMessageDto.getTargetId());
				}
			}

		} catch (Exception e) {
			log.error(e.getMessage());
		}

	}
}
