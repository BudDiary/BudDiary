package twozerotwo.buddiary.domain.comment.api;

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
import twozerotwo.buddiary.domain.comment.dto.CommentRequest;
import twozerotwo.buddiary.domain.comment.dto.CommentResponse;
import twozerotwo.buddiary.domain.comment.service.CommentService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/diaries")
@Slf4j
public class CommentController {
	private final CommentService commentService;

	@PostMapping("/comments")
	public ResponseEntity<CommentResponse> createComment(@RequestBody @Valid CommentRequest request) {
		return new ResponseEntity<CommentResponse>(commentService.createComment(request), HttpStatus.CREATED);
	}

	@DeleteMapping("/{diaryId}/comments/{commentId}/{username}")
	public ResponseEntity deleteComment(@PathVariable Long diaryId, @PathVariable Long commentId,
		@PathVariable String username) {
		commentService.deleteComment(username, diaryId, commentId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
