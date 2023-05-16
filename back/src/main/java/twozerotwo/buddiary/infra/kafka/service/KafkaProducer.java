package twozerotwo.buddiary.infra.kafka.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class KafkaProducer {
	private static final String TOPIC = "exam";
	private final KafkaTemplate<String, Object> kafkaTemplate;

	@Autowired
	public KafkaProducer(KafkaTemplate kafkaTemplate) {
		this.kafkaTemplate = kafkaTemplate;
	}

	public void sendMessage(Object message) {
		log.info(String.format("Produce message : %s", message));
		this.kafkaTemplate.send(TOPIC, message);
	}

}
