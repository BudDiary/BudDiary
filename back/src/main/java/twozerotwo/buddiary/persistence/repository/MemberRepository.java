package twozerotwo.buddiary.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import twozerotwo.buddiary.persistence.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
