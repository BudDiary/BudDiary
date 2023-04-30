package twozerotwo.buddiary.persistence.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import twozerotwo.buddiary.persistence.enums.ActionType;
import twozerotwo.buddiary.persistence.enums.ActionTypeConverter;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Reaction {
	@Id
	@Column(name = "REACTION_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Convert(converter = ActionTypeConverter.class)
	private ActionType type;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "DIARY_ID")
	private Diary diary;

	@ManyToOne
	@JoinColumn(name = "MEMBER_ID")
	private Member member;

}
