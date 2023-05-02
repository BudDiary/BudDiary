package twozerotwo.buddiary.domain.diary.service;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.service.ClubService;
import twozerotwo.buddiary.domain.diary.dto.DiaryPostRequest;
import twozerotwo.buddiary.domain.diary.dto.DiaryPostResponse;
import twozerotwo.buddiary.domain.diary.dto.StickerDto;
import twozerotwo.buddiary.infra.amazons3.uploader.S3Uploader;
import twozerotwo.buddiary.persistence.entity.Club;
import twozerotwo.buddiary.persistence.entity.Diary;
import twozerotwo.buddiary.persistence.entity.DiaryImage;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.entity.Sticker;
import twozerotwo.buddiary.persistence.entity.UnusedSticker;
import twozerotwo.buddiary.persistence.entity.UsedSticker;
import twozerotwo.buddiary.persistence.repository.ClubRepository;
import twozerotwo.buddiary.persistence.repository.DiaryRepository;
import twozerotwo.buddiary.persistence.repository.MemberRepository;
import twozerotwo.buddiary.persistence.repository.StickerRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class DiaryService {
	private final MemberRepository memberRepository;
	private final DiaryRepository diaryRepository;
	private final ClubRepository clubRepository;
	private final StickerRepository stickerRepository;
	private final S3Uploader s3Uploader;
	private final ClubService clubService;
	private final Long WRITE_POINT = 5L;
	@Transactional
	public void createClubDiary(DiaryPostRequest request, String clubUuid) throws IOException {
		/// TODO: 2023-05-02 요청한 사람이 클럽원인지 확인
		Club club = clubRepository.findById(clubUuid)
			.orElseThrow(() -> new RuntimeException("잘못된 UUid"));
		Member member = memberRepository.findByUsername(request.getMemberUsername())
			.orElseThrow(() -> new RuntimeException("잘못된 username"));
		// request.getStickerDtoList().get(0).getXCoordinate()
		// 다이어리 포스트 생성 > 저장
		Diary diary = Diary.builder()
			.club(club)
			.writer(member)
			.text(request.getText())
			.build();
		Diary savedDiary = diaryRepository.save(diary);
		// 이미지 리스트 만들고
		makeDiaryImage(savedDiary, request.getFileList());
		// 스티커 리스트 만들고
		makeStickerList(savedDiary, request.getStickerDtoList());
	}
	@Transactional
	public void makeDiaryImage(Diary diary, List<MultipartFile> fileList) throws IOException {
		List<DiaryImage> imgList = diary.getDiaryImages();

		if (imgList != null) {
			for (MultipartFile file : fileList) {
				String imgUrl = clubService.uploadS3(file, "Diary");
				DiaryImage diaryImage = DiaryImage.builder()
					.diary(diary)
					.imgUrl(imgUrl)
					.build();
				imgList.add(diaryImage);
			}
		}
	}
	@Transactional
	public void makeStickerList(Diary diary, List<StickerDto> stickerDtoList) {
		List<UsedSticker> usedStickerList = diary.getUsedStickers();
		// List<UnusedSticker> memberStickers = member.getStickers();
		Member member = diary.getWriter();

		if (stickerDtoList != null) {
			for (StickerDto stickerDto : stickerDtoList) {
				/// TODO: 2023-05-02 소유 여부 확인 맴버 메소드로 보내기
				// Boolean isOwned =  member.isOwned(stickerDto);
				Boolean flag = false;
				for (UnusedSticker ownedSticker : member.getStickers()) {
					if (ownedSticker.getSticker().getId().equals(stickerDto.getStickerId())) {
						flag = true;
						break;
					}
				}
				if (!flag) {
					throw new RuntimeException("스티커를 보유하고 있지 않습니다.");
				} else {
					Sticker sticker = stickerRepository.findById(stickerDto.getStickerId())
							.orElseThrow(() -> new RuntimeException("존재하지 않는 스티커"));
					UsedSticker usedSticker = diary.useSticker(sticker, stickerDto.getXCoordinate(), stickerDto.getYCoordinate());
					usedStickerList.add(usedSticker);
				}
			}
		}
	}
	@Transactional
	public void createPersonalDiary(DiaryPostRequest request) throws IOException {
		Member member = memberRepository.findByUsername(request.getMemberUsername())
			.orElseThrow(() -> new RuntimeException("잘못된 username"));
		// 다이어리 포스트 생성 > 저장
		Diary diary = Diary.builder()
			.writer(member)
			.text(request.getText())
			.build();
		Diary savedDiary = diaryRepository.save(diary);
		// 이미지 첨부
		makeDiaryImage(savedDiary, request.getFileList());
		// 스티커 리스트 만들고
		makeStickerList(savedDiary, request.getStickerDtoList());

	}
}
