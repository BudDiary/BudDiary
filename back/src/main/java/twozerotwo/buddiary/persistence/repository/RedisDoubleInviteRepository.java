package twozerotwo.buddiary.persistence.repository;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import twozerotwo.buddiary.infra.redis.service.RedisSubscriber;
import twozerotwo.buddiary.persistence.enums.NoticeType;

@RequiredArgsConstructor
@Repository
public class RedisDoubleInviteRepository {
	private final RedisMessageListenerContainer redisMessageListener;
	private final RedisSubscriber redisSubscriber;
	private Map<String, ChannelTopic> roomTopics;

	@PostConstruct
	private void init() {
		roomTopics = new HashMap<>();
		roomTopics.put(NoticeType.DOUBLE_INVITE.getCode(), new ChannelTopic(NoticeType.DOUBLE_INVITE.getCode()));
		redisMessageListener.addMessageListener(redisSubscriber, roomTopics.get(NoticeType.DOUBLE_INVITE.getCode()));
	}
	// public void createTopic(String roomId) {
	// 	roomTopics.put(roomId, new ChannelTopic(roomId));
	// 	redisMessageListener.addMessageListener(redisSubscriber, roomTopics.get(roomId));
	// }

	public ChannelTopic getTopic(String topic) {
		return roomTopics.get(topic);
	}

}
