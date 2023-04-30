package twozerotwo.buddiary.persistence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import twozerotwo.buddiary.persistence.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findById(Long id);

	Optional<Member> findByUsername(String username);
}
