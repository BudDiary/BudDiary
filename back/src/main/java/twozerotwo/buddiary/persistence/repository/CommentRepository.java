package twozerotwo.buddiary.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import twozerotwo.buddiary.persistence.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
