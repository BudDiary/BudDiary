package twozerotwo.buddiary.persistence.entity;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Reply {
	@Id
	@Column(name = "REPLY_ID")
	private String id;

	@ManyToOne(fetch = FetchType.LAZY)
	// @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "MEMBER_ID")
	private Member writer;

	@Builder.Default
	private LocalDateTime writeDate = LocalDateTime.now();

	@Column(nullable = false)
	@Size(min = 1, max = 200, message = "다이어리 내용은 1자 이상 200자 이하여야 합니다.")
	private String text;
}