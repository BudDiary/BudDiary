package twozerotwo.buddiary.domain.reply.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.service.ClubService;
import twozerotwo.buddiary.domain.comment.dto.CommentResponse;
import twozerotwo.buddiary.domain.reply.dto.ReplyRequest;
import twozerotwo.buddiary.domain.reply.dto.ReplyResponse;
import twozerotwo.buddiary.global.advice.exception.NotFoundException;
import twozerotwo.buddiary.persistence.entity.Comment;
import twozerotwo.buddiary.persistence.entity.Diary;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.entity.Reply;
import twozerotwo.buddiary.persistence.repository.CommentRepository;
import twozerotwo.buddiary.persistence.repository.DiaryRepository;
import twozerotwo.buddiary.persistence.repository.ReplyRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReplyService {
	private final ReplyRepository replyRepository;
	private final CommentRepository commentRepository;
	private final ClubService clubService;
	public ReplyResponse createReply(ReplyRequest request) {
		Member member = clubService.returnMemberByUsername(request.getUsername());
		Comment comment = commentRepository.findById(request.getCommentId())
			.orElseThrow(() -> new NotFoundException("해당 댓글을 찾을 수 없습니다."));
		Reply reply = Reply.builder()
			.text(request.getText())
			.comment(comment)
			.writer(member)
			.build();
		Reply savedReply = replyRepository.save(reply);
		return ReplyResponse.builder()
			.replyId(savedReply.getId())
			.writeDate(savedReply.getWriteDate())
			.writer(savedReply.getWriter())
			.text(savedReply.getText()).build();
	}
}
