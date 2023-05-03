package twozerotwo.buddiary.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import twozerotwo.buddiary.persistence.enums.NoticeType;
import twozerotwo.buddiary.persistence.enums.NoticeTypeConverter;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Notification {
	@Id
	@Column(name = "NOTIFICATION_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Builder.Default
	@Convert(converter = NoticeTypeConverter.class)
	private NoticeType type = NoticeType.CLUB_WRITE;

	@Builder.Default
	private Boolean isChecked = false;

	// null 가능한 외래키 설정 필요
	// receiver, senderG, senderM
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MEMBER_ID")
	private Member receiver;

	// 보낸 그룹의 uuid
	@Column(nullable = true)
	@Builder.Default
	private String senderG = null;

	// 보낸 Member username
	@Column(nullable = true)
	@Builder.Default
	private String senderM = null;
}
