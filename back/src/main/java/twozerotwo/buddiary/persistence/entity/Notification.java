package twozerotwo.buddiary.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Builder;
import twozerotwo.buddiary.persistence.enums.GroupTypeConverter;
import twozerotwo.buddiary.persistence.enums.NoticeType;
import twozerotwo.buddiary.persistence.enums.NoticeTypeConverter;

@Entity
public class Notification {
	@Id
	@Column(name = "NOTIFICATION_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Builder.Default
	@Convert(converter = NoticeTypeConverter.class)
	private NoticeType type = NoticeType.GROUP_WRITE;

	@Builder.Default
	private Boolean isChecked = false;

	// null 가능한 외래키 설정 필요
	// receiver, senderG, senderM


}
