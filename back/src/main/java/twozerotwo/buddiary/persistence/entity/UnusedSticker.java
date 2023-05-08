package twozerotwo.buddiary.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import twozerotwo.buddiary.global.advice.exception.BadRequestException;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@JsonIgnoreProperties({"id", "member"})
public class UnusedSticker {
	@JsonProperty("unusedStickerId")
	@Id
	@Column(name = "UNUSED_STICKER_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long count;

	@JsonProperty("member")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MEMBER_ID")
	private Member member;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "STICKER_ID")
	private Sticker sticker;

	public void minusCnt() {

		if (this.count - 1 < 0) {
			throw new BadRequestException("해당 스티커 개수가 부족합니다.");
		}
		this.count--;
	}
	public void plusCnt(Long count) {
		this.count += count;
	}
}
