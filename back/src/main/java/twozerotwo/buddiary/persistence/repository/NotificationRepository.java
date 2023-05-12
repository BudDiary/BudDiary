package twozerotwo.buddiary.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
	List<Notification> findByReceiverAndIsChecked(Member member, Boolean boolType);
}
