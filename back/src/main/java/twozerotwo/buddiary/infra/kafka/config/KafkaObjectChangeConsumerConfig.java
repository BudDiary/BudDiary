package twozerotwo.buddiary.infra.kafka.config;

import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import twozerotwo.buddiary.domain.notification.dto.SseMessageDto;

@EnableKafka
@Configuration
public class KafkaObjectChangeConsumerConfig {
	@Value("${spring.kafka.bootstrap-servers}")
	private String bootstrapServers;

	@Bean
	public ConsumerFactory<String, SseMessageDto> stockChangeConsumer() {

		Map<String, Object> configs = new HashMap<>();
		configs.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
		configs.put(ConsumerConfig.GROUP_ID_CONFIG, "foo");

		return new DefaultKafkaConsumerFactory<>(
			configs,
			new StringDeserializer(),
			new JsonDeserializer<>(SseMessageDto.class)
		);
	}

	@Bean
	public ConcurrentKafkaListenerContainerFactory<String, SseMessageDto> stockChangeListener() {
		ConcurrentKafkaListenerContainerFactory<String, SseMessageDto> factory
			= new ConcurrentKafkaListenerContainerFactory<>();
		factory.setConsumerFactory(stockChangeConsumer());
		return factory;
	}
}
