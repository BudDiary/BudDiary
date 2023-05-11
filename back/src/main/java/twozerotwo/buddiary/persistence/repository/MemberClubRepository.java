package twozerotwo.buddiary.persistence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import io.lettuce.core.dynamic.annotation.Param;
import twozerotwo.buddiary.persistence.entity.Club;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.entity.MemberClub;

public interface MemberClubRepository extends JpaRepository<MemberClub, Long> {
	@Query(value = "delete from MemberClub mc "
		+ "where mc.club = :club and mc.member = :member ")
	void deleteMemberClubByMemberAndClub(@Param("club") Club club, @Param("member") Member member);

	Optional<MemberClub> findMemberClubByClubAndMember(Club club, Member member);

}
