package twozerotwo.buddiary.persistence.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import io.lettuce.core.dynamic.annotation.Param;
import twozerotwo.buddiary.persistence.entity.Sticker;

public interface StickerRepository extends JpaRepository<Sticker, Long> {
	@Query("SELECT COUNT(s) > 0 FROM Sticker s WHERE s.name = :name")
	Boolean existsByName(@Param("pid") String name);

	List<Sticker> findAll();
}
