package twozerotwo.buddiary.infra.redis.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import twozerotwo.buddiary.domain.notification.dto.InviteMessageDto;

@RequiredArgsConstructor
@Service
public class RedisPublisher {

	// private final RedisTemplate<String, Object> redisTemplate;
	private final RedisTemplate<String, InviteMessageDto> redisInviteMessageDtoTemplate;
	// private final ChatRoomRedisRepository chatRoomRedisRepository;
	//
	// @KafkaListener(topics="exam", groupId = "foo")
	// public void kafkaListener(String message) throws JsonProcessingException {
	// 	ObjectMapper objectMapper = new ObjectMapper();
	// 	ChatMessageDto chatMessageDto = objectMapper.readValue(message, ChatMessageDto.class);
	// 	System.out.println("publish : " + chatMessageDto.toString());
	// 	redisTemplate.convertAndSend(((ChannelTopic) chatRoomRedisRepository.getTopic(chatMessageDto.getRoomId())).getTopic(), chatMessageDto);
	// }


	public void publishNotification(ChannelTopic topic, InviteMessageDto inviteMessageDto) {
		System.out.println("[notification]"+ topic.getTopic());
		redisInviteMessageDtoTemplate.convertAndSend(topic.getTopic(), inviteMessageDto);
	}

	// public void pubLikes(ChannelTopic topic, LikeResponse likeResponse) {
	// 	System.out.println("[publish Likes]"+ topic.getTopic());
	// 	redisTemplate.convertAndSend(topic.getTopic(), likeResponse);
	// }
}
