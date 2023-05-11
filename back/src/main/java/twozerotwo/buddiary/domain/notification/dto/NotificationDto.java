package twozerotwo.buddiary.domain.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import twozerotwo.buddiary.persistence.enums.NoticeType;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class NotificationDto {
	private Long id;
	private String type;
	private Boolean isChecked;
	@Builder.Default
	private String senderG = null;
	@Builder.Default
	private String senderM = null;
}
