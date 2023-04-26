package twozerotwo.buddiary.persistence.repository;

import twozerotwo.buddiary.persistence.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
