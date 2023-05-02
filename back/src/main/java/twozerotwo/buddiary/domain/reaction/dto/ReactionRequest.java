package twozerotwo.buddiary.domain.reaction.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.persistence.enums.ActionType;
@Getter
@Builder
@Slf4j
@NoArgsConstructor
@AllArgsConstructor
public class ReactionRequest {
	private Long diaryId;
	private String memberUsername;
	private ActionType actionType;

}
