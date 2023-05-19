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
	private String clubUuid = null;
	@Builder.Default
	private String clubName = null;
	@Builder.Default
	private String username = null;
	@Builder.Default
	private String nickname = null;
}
