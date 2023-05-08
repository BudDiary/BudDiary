package twozerotwo.buddiary.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import io.lettuce.core.dynamic.annotation.Param;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.entity.Sticker;
import twozerotwo.buddiary.persistence.entity.UnusedSticker;

public interface UnusedStickerRepository extends JpaRepository<UnusedSticker, Long> {
	@Query(value = "SELECT us FROM UnusedSticker us "
		+ "WHERE us.member = :member AND us.sticker = :sticker" )
	UnusedSticker findByMemberIdAndStickerId(@Param("member") Member member, @Param("sticker") Sticker sticker);

	List<UnusedSticker> findAllByMember(Member member);
}
