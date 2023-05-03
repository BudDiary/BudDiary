package twozerotwo.buddiary.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import twozerotwo.buddiary.persistence.entity.MemberClub;

public interface MemberClubRepository extends JpaRepository<MemberClub, Long> {
}
