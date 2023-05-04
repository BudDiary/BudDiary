package twozerotwo.buddiary.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import twozerotwo.buddiary.domain.diary.dto.UsedStickerDto;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@JsonIgnoreProperties({"diary"})
public class UsedSticker {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "USED_STICKER_ID")
	private Long id;

	@NotNull(message = "x좌표가 비어있습니다.")
	private Double xCoordinate;
	@NotNull(message = "y좌표가 비어있습니다.")
	private Double yCoordinate;

	// 다이어리 아이디

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "DIARY_ID")
	@JsonProperty("diary")
	private Diary diary;

	// 스티커 아이디
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "STICKER_ID")
	private Sticker sticker;

	public UsedStickerDto toUsedStickerDto() {
		return UsedStickerDto.builder()
			.stickerId(this.sticker.getId())
			.xCoordinate(this.xCoordinate)
			.yCoordinate(this.yCoordinate)
			.imgUrl(this.getSticker().getImageUrl())
			.build();
	}

}
