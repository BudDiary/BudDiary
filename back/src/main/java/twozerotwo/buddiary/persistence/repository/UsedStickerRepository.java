package twozerotwo.buddiary.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import twozerotwo.buddiary.persistence.entity.UsedSticker;

public interface UsedStickerRepository extends JpaRepository<UsedSticker, Long> {
}
