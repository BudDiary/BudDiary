package twozerotwo.buddiary.persistence.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
	@Column(nullable = true)
	private String photoPath;
	@Builder.Default
	private LocalDateTime writeDate = LocalDateTime.now();

	// @ManyToOne(fetch = FetchType.LAZY)
	// @JoinColumn(name = "MEMBER_ID")
	// private Member writer;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CLUB_ID")
	@Builder.Default
	private Club club = null;


	@OneToMany(mappedBy = "diary", cascade = CascadeType.REMOVE)
	private List<Reaction> reactions = new ArrayList<>();
	@OneToMany(mappedBy = "diary", cascade = CascadeType.REMOVE)
	private List<UsedSticker> usedStickers = new ArrayList<>();
}
