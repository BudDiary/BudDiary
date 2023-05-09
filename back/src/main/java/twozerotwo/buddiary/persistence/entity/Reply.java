package twozerotwo.buddiary.persistence.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@JsonIgnoreProperties({"comment"})
public class Reply {
	@Id
	@Column(name = "REPLY_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "MEMBER_ID")
	private Member writer;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "COMMENT_ID")
	@JsonProperty("comment")
	private Comment comment;

	@Builder.Default
	private LocalDateTime writeDate = LocalDateTime.now();

	@Column(nullable = false)
	@Size(min = 1, max = 200, message = "댓글은 1자 이상 200자 이하여야 합니다.")
	private String text;

}
