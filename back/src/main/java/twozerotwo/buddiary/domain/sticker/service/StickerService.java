package twozerotwo.buddiary.domain.sticker.service;

import java.io.IOException;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.service.ClubService;
import twozerotwo.buddiary.domain.sticker.dto.StickerBuyRequest;
import twozerotwo.buddiary.domain.sticker.dto.StickerRegisterRequest;
import twozerotwo.buddiary.global.advice.exception.BadRequestException;
import twozerotwo.buddiary.global.advice.exception.NotFoundException;
import twozerotwo.buddiary.infra.amazons3.uploader.S3Uploader;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.entity.Sticker;
import twozerotwo.buddiary.persistence.entity.UnusedSticker;
import twozerotwo.buddiary.persistence.repository.StickerRepository;
import twozerotwo.buddiary.persistence.repository.UnusedStickerRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class StickerService {
	private final StickerRepository stickerRepository;
	private final ClubService clubService;
	private final S3Uploader s3Uploader;
	private final UnusedStickerRepository unusedStickerRepository;

	@Transactional
	public Sticker registerSticker(StickerRegisterRequest request) throws IOException {
		if (stickerRepository.existsByName(request.getName())) {
			throw new BadRequestException("이미 존재하는 스티커 이름입니다.");
		}
		String uploadUrl = s3Uploader.upload(request.getImgFile(), "Sticker");

		Sticker sticker = Sticker.builder()
			.price(request.getPrice())
			.name(request.getName())
			.imageUrl(uploadUrl).build();
		log.info("uploadUrl" + uploadUrl);
		return stickerRepository.save(sticker);
	}

	@Transactional
	public void buySticker(Long stickerId, StickerBuyRequest request) {
		Sticker sticker = returnStickerById(stickerId);
		Member member = clubService.returnMemberByUsername(request.getUsername());
		Long totalPrice = sticker.getPrice() * request.getCount();
		boolean canBuy = member.checkPoint(totalPrice);
		if (canBuy) {
			// unusedSticker에 맴버, 스티커 같은 거 있으면 거기 조회 후++
			UnusedSticker originSticker = unusedStickerRepository.findByMemberIdAndStickerId(member, sticker);
			if (originSticker != null) {
				originSticker.plusCnt(request.getCount());
			} else {
				UnusedSticker unusedSticker = UnusedSticker.builder()
					.count(request.getCount())
					.member(member)
					.sticker(sticker)
					.build();
				unusedStickerRepository.save(unusedSticker);
			}
			member.minusPoint(totalPrice);
		} else {
			throw new BadRequestException("포인트가 부족합니다.");
		}
	}

	public List<Sticker> getAllSticker() {
		return stickerRepository.findAll();
	}

	public Sticker returnStickerById(Long stickerId) {
		Sticker sticker = stickerRepository.findById(stickerId)
			.orElseThrow(() -> new NotFoundException("존재하지 않는 스티커입니다."));
		return sticker;
	}

	public List<UnusedSticker> getMineSticker(String username) {
		Member member = clubService.returnMemberByUsername(username);
		return unusedStickerRepository.findAllByMember(member);
	}
}
