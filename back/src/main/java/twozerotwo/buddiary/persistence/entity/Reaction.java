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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import twozerotwo.buddiary.domain.reaction.dto.ReactionDto;
import twozerotwo.buddiary.persistence.enums.ActionType;
import twozerotwo.buddiary.persistence.enums.ActionTypeConverter;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@JsonIgnoreProperties({ "reactionId", "diary", "member"})
public class Reaction {
	@Id
	@Column(name = "REACTION_ID")
	@JsonProperty("reactionId")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Convert(converter = ActionTypeConverter.class)
	private ActionType type;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonProperty("diary")
	@JoinColumn(name = "DIARY_ID")
	private Diary diary;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MEMBER_ID")
	@JsonProperty("member")
	private Member member;

	public ReactionDto toDto() {
		return ReactionDto.builder()
			.id(this.id)
			.username(this.member.getUsername())
			.actionType(this.getType())
			.build();
	}
}
