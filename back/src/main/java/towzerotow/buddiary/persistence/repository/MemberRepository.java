package towzerotow.buddiary.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import towzerotow.buddiary.persistence.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
