package twozerotwo.buddiary.domain.reaction.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.service.ClubService;
import twozerotwo.buddiary.domain.diary.service.DiaryService;
import twozerotwo.buddiary.domain.reaction.dto.ReactionDto;
import twozerotwo.buddiary.domain.reaction.dto.ReactionRequest;
import twozerotwo.buddiary.global.advice.exception.BadRequestException;
import twozerotwo.buddiary.persistence.entity.Diary;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.entity.Reaction;
import twozerotwo.buddiary.persistence.repository.DiaryRepository;
import twozerotwo.buddiary.persistence.repository.MemberRepository;
import twozerotwo.buddiary.persistence.repository.ReactionRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReactionService {
	private final DiaryService diaryService;
	private final ClubService clubService;
	private final MemberRepository memberRepository;
	private final ReactionRepository reactionRepository;

	@Transactional
	public List<ReactionDto> createReaction(ReactionRequest request) {
		// 다이어리 조회
		Diary diary = diaryService.returnDiaryById(request.getDiaryId());
		Member member = clubService.returnMemberByUsername(request.getMemberUsername());
		/// TODO: 2023-05-02 중복 처리 어떻게 할까
		// 다이어리 엑션 리스트에 추가
		List<Reaction> reactions = diary.getReactions();
		Reaction newReaction = Reaction.builder()
			.type(request.getActionType())
			.member(member)
			.diary(diary)
			.build();
		reactions.add(newReaction);

		List<ReactionDto> reactionDtos = new ArrayList<>();
		for (Reaction reaction : reactions) {
			reactionDtos.add(reaction.toDto());
		}
		return reactionDtos;
	}

	public void deleteReaction(String username, Long diaryId, Long actionId) {
		// 리액션 조회 후 memberId랑 일치하는지 확인
		Reaction reaction = reactionRepository.findById(actionId)
			.orElseThrow(() -> new BadRequestException("해당 리액션을 조회할 수 없습니다."));
		Member member = clubService.returnMemberByUsername(username);
		Diary diary = diaryService.returnDiaryById(diaryId);
		// 다이어리의 반응이 맞는지 확인
		if (!diary.getReactions().contains(reaction)) {
			throw new BadRequestException("요청 다이어리의 반응이 아닙니다.");
		}
		if (reaction.getMember().equals(member)) {
			// 삭제
			reactionRepository.delete(reaction);
		} else {
			throw new BadRequestException("요청자의 반응이 아닌 걸 취소할 수 없습니다.");
		}
	}
}
