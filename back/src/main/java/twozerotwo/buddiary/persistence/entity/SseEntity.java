package twozerotwo.buddiary.persistence.entity;

import javax.persistence.Id;

import org.springframework.data.redis.core.RedisHash;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@RedisHash("sseEntity")
@NoArgsConstructor
@AllArgsConstructor
public class SseEntity {
	@Id
	private Long id;
	private SseEmitter sseEmitter;
}
