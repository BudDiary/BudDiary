package twozerotwo.buddiary.persistence.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@JsonIgnoreProperties({ "diaryId" })
public class Comment {
	@Id
	@Column(name = "COMMENT_ID")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MEMBER_ID")
	private Member writer;
	@JsonProperty("diaryId")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "DIARY_ID")
	private Diary diary;

	@Builder.Default
	@OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
	private List<Reply> replies = new ArrayList<>();

	@Builder.Default
	private LocalDateTime writeDate = LocalDateTime.now();

	@Column(nullable = false)
	@Size(min = 1, max = 200, message = "댓글은 1자 이상 200자 이하여야 합니다.")
	private String text;
}
