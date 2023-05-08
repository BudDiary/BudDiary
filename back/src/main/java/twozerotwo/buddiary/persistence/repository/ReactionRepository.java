package twozerotwo.buddiary.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import twozerotwo.buddiary.persistence.entity.Diary;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.entity.Reaction;
import twozerotwo.buddiary.persistence.enums.ActionType;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {
	boolean existsReactionsByDiaryAndMemberAndType(Diary diary, Member member, ActionType type);
}
