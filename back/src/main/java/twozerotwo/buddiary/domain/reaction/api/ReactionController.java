package twozerotwo.buddiary.domain.reaction.api;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.reaction.dto.ReactionDto;
import twozerotwo.buddiary.domain.reaction.dto.ReactionRequest;
import twozerotwo.buddiary.domain.reaction.service.ReactionService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/diaries")
@Slf4j
public class ReactionController {
	private final ReactionService reactionService;

	@PostMapping("/reactions")
	public ResponseEntity createReaction(@RequestBody @Valid ReactionRequest request, HttpServletRequest servlet) {
		List<ReactionDto> reactions = reactionService.createReaction(request, servlet);
		return new ResponseEntity<>(Map.of("reactionList", reactions), HttpStatus.CREATED);
	}

	@DeleteMapping("/{diaryId}/reactions/{actionId}/{username}")
	public ResponseEntity deleteReaction(@PathVariable Long diaryId, @PathVariable Long actionId,
		HttpServletRequest servlet) {
		reactionService.deleteReaction(servlet, diaryId, actionId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
