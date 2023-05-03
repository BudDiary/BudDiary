package twozerotwo.buddiary.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import twozerotwo.buddiary.persistence.entity.Reaction;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {
}
