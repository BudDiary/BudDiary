package twozerotwo.buddiary.domain.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SseMessageDto {
	NotificationDto notificationDto;
	Long targetId;
}
