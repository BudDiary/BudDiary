package twozerotwo.buddiary.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import twozerotwo.buddiary.persistence.entity.Sticker;

public interface StickerRepository extends JpaRepository<Sticker, Long> {
	boolean existsStickerByName(String name);
}
