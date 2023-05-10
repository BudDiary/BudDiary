package twozerotwo.buddiary.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import twozerotwo.buddiary.persistence.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
