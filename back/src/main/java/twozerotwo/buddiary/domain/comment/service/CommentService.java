package twozerotwo.buddiary.domain.comment.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.service.ClubService;
import twozerotwo.buddiary.domain.comment.dto.CommentRequest;
import twozerotwo.buddiary.domain.comment.dto.CommentResponse;
import twozerotwo.buddiary.domain.diary.service.DiaryService;
import twozerotwo.buddiary.global.advice.exception.BadRequestException;
import twozerotwo.buddiary.global.advice.exception.NotFoundException;
import twozerotwo.buddiary.persistence.entity.Comment;
import twozerotwo.buddiary.persistence.entity.Diary;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.repository.CommentRepository;
import twozerotwo.buddiary.persistence.repository.DiaryRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentService {
	private final ClubService clubService;
	private final DiaryService diaryService;
	private final DiaryRepository diaryRepository;
	private final CommentRepository commentRepository;
	private static Long ADD_COMMENT_POINT = 5l;

	@Transactional
	public CommentResponse createComment(CommentRequest request) {
		Member member = clubService.returnMemberByUsername(request.getUsername());
		Diary diary = diaryService.returnDiaryById(request.getDiaryId());
		Comment comment = Comment.builder()
			.text(request.getText())
			.diary(diary)
			.writer(member)
			.build();
		Comment savedComment = commentRepository.save(comment);
		member.addPoint(ADD_COMMENT_POINT);
		return CommentResponse.builder()
			.commentId(savedComment.getId())
			.text(savedComment.getText())
			.writeDate(savedComment.getWriteDate())
			.writer(savedComment.getWriter())
			.build();
	}

	@Transactional
	public void deleteComment(String username, Long diaryId, Long commentId) {
		Member member = clubService.returnMemberByUsername(username);
		Diary diary = diaryService.returnDiaryById(diaryId);
		Comment comment = returnCommentById(commentId);
		if (!comment.getWriter().equals(member)) {
			throw new BadRequestException("해당 댓글의 작성자가 아닙니다.");
		}
		if (!comment.getDiary().equals(diary)) {
			throw new BadRequestException("해당 다이어리의 댓글이 아닙니다.");
		}
		commentRepository.delete(comment);
	}

	public Comment returnCommentById(Long commentId) {
		Comment comment = commentRepository.findById(commentId)
			.orElseThrow(() -> new NotFoundException(commentId + "번의 댓글을 찾을 수 없습니다."));
		return comment;
	}

}
