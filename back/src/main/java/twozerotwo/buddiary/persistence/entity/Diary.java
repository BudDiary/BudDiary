package twozerotwo.buddiary.persistence.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
public class Diary {
	@Id
	@Column(name = "DIARY_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	@Size(min = 1, max = 1000, message = "다이어리 내용은 1자 이상 1000자 이하여야 합니다.")
	private String text;

	@Builder.Default
	private LocalDateTime writeDate = LocalDateTime.now();
	@Builder.Default
	@OneToMany(mappedBy = "diary", cascade = CascadeType.ALL)
	private List<DiaryImage> diaryImages = new ArrayList<>();

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MEMBER_ID")
	private Member writer;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CLUB_ID")
	@Builder.Default
	private Club club = null;

	@Builder.Default
	@OneToMany(mappedBy = "diary", cascade = CascadeType.ALL)
	private List<Reaction> reactions = new ArrayList<>();
	@Builder.Default
	@OneToMany(mappedBy = "diary", cascade = CascadeType.ALL)
	private List<UsedSticker> usedStickers = new ArrayList<>();

	@Builder.Default
	@OneToMany(mappedBy = "diary", cascade = CascadeType.ALL)
	private List<Comment> comments = new ArrayList<>();

	private Float positiveRate;
	private Float negativeRate;

	public UsedSticker useSticker(Sticker sticker, Double xCoordinate, Double yCoordinate) {
		return UsedSticker.builder()
			.diary(this)
			.xCoordinate(xCoordinate)
			.yCoordinate(yCoordinate)
			.sticker(sticker)
			.build();

	}
}
