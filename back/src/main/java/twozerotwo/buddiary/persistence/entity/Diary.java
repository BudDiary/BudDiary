package twozerotwo.buddiary.persistence.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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

	@Column(nullable = false, length = 1000)
	private String text;
	@Column(nullable = false)
	private String photoPath;
	@Builder.Default
	private LocalDateTime writeDate = LocalDateTime.now();

	@ManyToOne
	@JoinColumn(name = "MEMBER_ID")
	private Member writer;

	@ManyToOne
	@JoinColumn(name = "CLUB_ID")
	@Builder.Default
	private Club club = null;
}
