package twozerotwo.buddiary.domain.sticker.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.service.ClubService;
import twozerotwo.buddiary.domain.sticker.dto.StickerBuyRequest;
import twozerotwo.buddiary.domain.sticker.dto.StickerRegisterRequest;
import twozerotwo.buddiary.global.advice.exception.BadRequestException;
import twozerotwo.buddiary.global.advice.exception.NotFoundException;
import twozerotwo.buddiary.global.util.AuthenticationUtil;
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
	private final AuthenticationUtil authenticationUtil;

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
	public Long buySticker(Long stickerId, StickerBuyRequest request, HttpServletRequest servlet) {
		Sticker sticker = returnStickerById(stickerId);
		// Member member = clubService.returnMemberByUsername(request.getUsername());
		Member member = authenticationUtil.getMemberEntityFromRequest(servlet);
		if (request.getCount() <= 0) {
			throw new BadRequestException("구매 수량이 0 이하입니다.");
		}
		Long totalPrice = sticker.getPrice() * request.getCount();
		boolean canBuy = member.checkPoint(totalPrice);
		if (canBuy) {
			// unusedSticker에 맴버, 스티커 같은 거 있으면 거기 조회 후++
			Optional<UnusedSticker> originSticker = unusedStickerRepository.findByMemberAndStickerId(member, sticker);
			if (originSticker.isPresent()) {
				UnusedSticker unusedSticker = originSticker.get();
				unusedSticker.plusCnt(request.getCount());
			} else {
				UnusedSticker unusedSticker = UnusedSticker.builder()
					.count(request.getCount())
					.member(member)
					.sticker(sticker)
					.build();
				unusedStickerRepository.save(unusedSticker);
			}
			return member.minusPoint(totalPrice);
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


	public Sticker returnStickerByUrl(String stickerUrl) {
		Sticker sticker = stickerRepository.findByImageUrl(stickerUrl)
			.orElseThrow(() -> new NotFoundException("존재하지 않는 스티커입니다."));
		return sticker;
	}

	public List<UnusedSticker> getMineSticker(HttpServletRequest servlet) {
		// Member member = clubService.returnMemberByUsername(username);
		Member member = authenticationUtil.getMemberEntityFromRequest(servlet);
		return unusedStickerRepository.findAllByMember(member);
	}
}
