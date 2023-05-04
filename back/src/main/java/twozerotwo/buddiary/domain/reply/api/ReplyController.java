package twozerotwo.buddiary.domain.reply.api;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@RequestMapping("/api/diaries/comments/replies")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Slf4j
public class ReplyController {
	private final ReplyService replyService;

	@PostMapping
	public ResponseEntity<ReplyResponse> createReply(@RequestBody @Valid ReplyRequest request) {
		return new ResponseEntity<ReplyResponse>(replyService.createReply(request), HttpStatus.CREATED);
	}
}
