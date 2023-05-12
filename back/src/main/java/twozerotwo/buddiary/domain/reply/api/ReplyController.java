package twozerotwo.buddiary.domain.reply.api;

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
import twozerotwo.buddiary.domain.reply.dto.ReplyRequest;
import twozerotwo.buddiary.domain.reply.dto.ReplyResponse;
import twozerotwo.buddiary.domain.reply.service.ReplyService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/diaries")
@Slf4j
public class ReplyController {
	private final ReplyService replyService;

	@PostMapping("/comments/replies")
	public ResponseEntity<ReplyResponse> createReply(@RequestBody @Valid ReplyRequest request,
		HttpServletRequest servlet) {
		return new ResponseEntity<ReplyResponse>(replyService.createReply(request, servlet), HttpStatus.CREATED);
	}

	@DeleteMapping("/comments/{commentId}/replies/{replyId}")
	public ResponseEntity deleteReply(@PathVariable Long commentId, @PathVariable Long replyId,
		HttpServletRequest servlet) {
		replyService.deleteReply(servlet, commentId, replyId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
