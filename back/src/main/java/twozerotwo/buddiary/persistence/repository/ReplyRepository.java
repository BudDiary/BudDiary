package twozerotwo.buddiary.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import twozerotwo.buddiary.persistence.entity.Reply;

public interface ReplyRepository extends JpaRepository<Reply, Long> {
}
