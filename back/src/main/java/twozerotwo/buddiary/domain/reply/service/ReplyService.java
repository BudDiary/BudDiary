package twozerotwo.buddiary.domain.reply.service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.service.ClubService;
import twozerotwo.buddiary.domain.comment.service.CommentService;
import twozerotwo.buddiary.domain.reply.dto.ReplyRequest;
import twozerotwo.buddiary.domain.reply.dto.ReplyResponse;
import twozerotwo.buddiary.global.advice.exception.BadRequestException;
import twozerotwo.buddiary.global.advice.exception.NotFoundException;
import twozerotwo.buddiary.global.util.AuthenticationUtil;
import twozerotwo.buddiary.persistence.entity.Comment;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.entity.Reply;
import twozerotwo.buddiary.persistence.repository.CommentRepository;
import twozerotwo.buddiary.persistence.repository.ReplyRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReplyService {
	private static final Long ADD_REPLY_POINT = 5L;
	private final ReplyRepository replyRepository;
	private final CommentRepository commentRepository;
	private final AuthenticationUtil authenticationUtil;
	private final ClubService clubService;
	private final CommentService commentService;

	@Transactional
	public ReplyResponse createReply(ReplyRequest request, HttpServletRequest servlet) {
		Member member = authenticationUtil.getMemberEntityFromRequest(servlet);
		Comment comment = commentService.returnCommentById(request.getCommentId());
		Reply reply = Reply.builder()
			.text(request.getText())
			.comment(comment)
			.writer(member)
			.build();
		Reply savedReply = replyRepository.save(reply);
		//point 추가
		member.addPoint(ADD_REPLY_POINT);

		return ReplyResponse.builder()
			.replyId(savedReply.getId())
			.writeDate(savedReply.getWriteDate())
			.writer(savedReply.getWriter())
			.text(savedReply.getText())
			.build();
	}

	@Transactional
	public void deleteReply(HttpServletRequest servlet, Long commentId, Long replyId) {
		Member member = authenticationUtil.getMemberEntityFromRequest(servlet);
		Comment comment = commentService.returnCommentById(commentId);
		Reply reply = returnReplyById(replyId);
		if (!reply.getWriter().equals(member)) {
			throw new BadRequestException("해당 대댓글의 작성자가 아닙니다.");
		}
		if (!reply.getComment().equals(comment)) {
			throw new BadRequestException(commentId + "번의 댓글의 대댓글이 아닙니다.");
		}
		replyRepository.deleteById(reply.getId());

	}

	public Reply returnReplyById(Long replyId) {
		Reply reply = replyRepository.findById(replyId)
			.orElseThrow(() -> new NotFoundException(replyId + "번의 reply를 찾을 수 없습니다."));
		return reply;
	}
}
