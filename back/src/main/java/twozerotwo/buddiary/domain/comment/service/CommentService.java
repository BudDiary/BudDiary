package twozerotwo.buddiary.domain.comment.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.service.ClubService;
import twozerotwo.buddiary.domain.comment.dto.CommentRequest;
import twozerotwo.buddiary.domain.comment.dto.CommentResponse;
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
	private final DiaryRepository diaryRepository;
	private final CommentRepository commentRepository;
	@Transactional
	public CommentResponse createComment(CommentRequest request) {
		Member member = clubService.returnMemberByUsername(request.getUsername());
		Diary diary = diaryRepository.findById(request.getDiaryId())
			.orElseThrow(() -> new NotFoundException("해당 다이어리를 찾을 수 없습니다."));
		Comment comment = Comment.builder()
			.text(request.getText())
			.diary(diary)
			.writer(member)
			.build();
		Comment savedComment = commentRepository.save(comment);
		return CommentResponse.builder()
			.commentId(savedComment.getId())
			.writeDate(savedComment.getWriteDate())
			.writer(savedComment.getWriter())
			.build();
	}
}
