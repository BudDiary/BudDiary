package twozerotwo.buddiary.domain.notification.dto;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class InviteMessageDto {
	SseEmitter sseEmitter;
	NotificationDto notificationDto;
	Long userId;
}
