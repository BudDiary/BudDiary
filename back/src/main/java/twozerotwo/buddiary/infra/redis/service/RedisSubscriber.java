package twozerotwo.buddiary.infra.redis.service;

import static twozerotwo.buddiary.domain.notification.api.SseController.*;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
// import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.notification.dto.InviteMessageDto;
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
			log.info("[publishMessage]: " + publishMessage);
			InviteMessageDto inviteMessageDto = objectMapper.readValue(publishMessage, InviteMessageDto.class);


			if (topic.equals(NoticeType.DOUBLE_INVITE.getCode())) {


				try {
					// sseEmitter.send(SseEmitter.event().name("DOUBLE_INVITE").data(inviteMessageDto.getNotificationDto()));
					SseEmitter sseEmitter = inviteMessageDto.getSseEmitter();
					log.info("DOUBLE_INVITE" + sseEmitter);
					// sseEmitter.send(SseEmitter.event().name("DOUBLE_INVITE").data(inviteMessageDto.getNotificationDto()));
					sseEmitter.send(SseEmitter.event().name("DOUBLE_INVITE").data(publishMessage));
					log.info("여기요");
				} catch (Exception e) {
					log.info("저기요");
					sseEmitters.remove(inviteMessageDto.getUserId());
				}
				// messagingTemplate.convertAndSendToUser((String)sideMessageDto.getMessageBody().get("username"),
				// 	"/sub/side-bar", sideMessageDto);
			}
			// else if (topic.equals("game-room")) {
			// 	RoomMessageDto roomMessageDto = objectMapper.readValue(publishMessage, RoomMessageDto.class);
			// 	messagingTemplate.convertAndSend("/sub/game-room/" + roomMessageDto.getRoomId(), roomMessageDto);
			// } else if (topic.equals("wait-room")) {
			// 	WaitMessageDto waitMessageDto = objectMapper.readValue(publishMessage, WaitMessageDto.class);
			// 	String roomId = (String)waitMessageDto.getMessageBody().get("roomId");
			// 	messagingTemplate.convertAndSend("/sub/wait-room/" + roomId, waitMessageDto);
			// } else {
			// 	RoomMessageDto roomMessageDto = objectMapper.readValue(publishMessage, RoomMessageDto.class);
			// 	messagingTemplate.convertAndSend("/sub/result-room/" + roomMessageDto.getRoomId(), roomMessageDto);
			// }

		} catch (Exception e) {
			log.error(e.getMessage());
		}

	}
}
