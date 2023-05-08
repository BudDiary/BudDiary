package twozerotwo.buddiary.domain.sticker.service;

import java.io.IOException;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.sticker.dto.StickerRegisterRequest;
import twozerotwo.buddiary.global.advice.exception.BadRequestException;
import twozerotwo.buddiary.infra.amazons3.uploader.S3Uploader;
import twozerotwo.buddiary.persistence.entity.Sticker;
import twozerotwo.buddiary.persistence.repository.StickerRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class StickerService {
	private StickerRepository stickerRepository;
	private final S3Uploader s3Uploader;

	@Transactional
	public Sticker registerSticker(StickerRegisterRequest request) throws IOException {
		if (stickerRepository.existsStickerByName(request.getName())) {
			throw new BadRequestException("이미 존재하는 스티커 이름입니다.");
		}
		log.info("ㄷㄷ");

		String uploadUrl = s3Uploader.upload(request.getImgFile(), "Sticker");
		log.info("uploadUrl" + uploadUrl);
		Sticker sticker = Sticker.builder()
			.price(request.getPrice())
			.name(request.getName())
			.imageUrl(uploadUrl).build();
		return stickerRepository.save(sticker);

	}
}
