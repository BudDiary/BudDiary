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
	private Map<String, ChannelTopic> doubleTopics;

	@PostConstruct
	private void init() {
		doubleTopics = new HashMap<>();
		doubleTopics.put(NoticeType.DOUBLE_INVITE.getCode(), new ChannelTopic(NoticeType.DOUBLE_INVITE.getCode()));
		redisMessageListener.addMessageListener(redisSubscriber, doubleTopics.get(NoticeType.DOUBLE_INVITE.getCode()));
	}

	public ChannelTopic getTopic(String topic) {
		return doubleTopics.get(topic);
	}

}
