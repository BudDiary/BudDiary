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
public class RedisClubWriteRepository {
	private final RedisMessageListenerContainer redisMessageListener;
	private final RedisSubscriber redisSubscriber;
	private Map<String, ChannelTopic> clubTopics;

	@PostConstruct
	private void init() {
		clubTopics = new HashMap<>();
		clubTopics.put(NoticeType.CLUB_WRITE.getCode(), new ChannelTopic(NoticeType.CLUB_WRITE.getCode()));
		redisMessageListener.addMessageListener(redisSubscriber, clubTopics.get(NoticeType.CLUB_WRITE.getCode()));
	}

	public ChannelTopic getTopic(String topic) {
		return clubTopics.get(topic);
	}
}
