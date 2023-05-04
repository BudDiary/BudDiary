package twozerotwo.buddiary.persistence.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import io.lettuce.core.dynamic.annotation.Param;
import twozerotwo.buddiary.persistence.entity.Diary;
import twozerotwo.buddiary.persistence.entity.Member;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
	@Query(value = "SELECT d FROM Diary d "
		+ "WHERE d.writer = :member AND d.writeDate BETWEEN :start AND :end AND d.club IS NULL ")
	List<Diary> findPersonalAllByDateAndMemberId(@Param("member") Member member, @Param("start") LocalDateTime start,
		@Param("start") LocalDateTime end);

	@Query(value = "SELECT d FROM Diary d "
		+ "WHERE d.writer = :member AND d.writeDate BETWEEN :start AND :end AND d.club IS NOT NULL ")
	List<Diary> findClubAllByDateAndMemberId(@Param("member") Member member, @Param("start") LocalDateTime start,
		@Param("start") LocalDateTime end);

}
