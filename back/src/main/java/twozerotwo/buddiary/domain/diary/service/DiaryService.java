package twozerotwo.buddiary.domain.diary.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.service.ClubService;
import twozerotwo.buddiary.domain.diary.dto.DiaryPostRequest;
import twozerotwo.buddiary.domain.diary.dto.SimpleDiaryDto;
import twozerotwo.buddiary.domain.diary.dto.StickerDto;
import twozerotwo.buddiary.domain.diary.dto.UsedStickerDto;
import twozerotwo.buddiary.global.advice.exception.NotFoundException;
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
import twozerotwo.buddiary.persistence.repository.UnusedStickerRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class DiaryService {
	private final MemberRepository memberRepository;
	private final DiaryRepository diaryRepository;
	private final ClubRepository clubRepository;
	private final StickerRepository stickerRepository;
	private final UnusedStickerRepository unusedStickerRepository;
	private final S3Uploader s3Uploader;
	private final ClubService clubService;
	// private final Long WRITE_POINT = 5L;

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
				Boolean stickerOwned = false;
				for (UnusedSticker ownedSticker : member.getStickers()) {
					if (ownedSticker.getSticker().getId().equals(stickerDto.getStickerId())) {
						stickerOwned = true;
						break;
					}
				}
				if (!stickerOwned) {
					throw new RuntimeException("스티커를 보유하고 있지 않습니다.");
				}
				Sticker sticker = stickerRepository.findById(stickerDto.getStickerId())
					.orElseThrow(() -> new RuntimeException("존재하지 않는 스티커"));
				UsedSticker usedSticker = UsedSticker.builder()
					.diary(diary)
					.xCoordinate(stickerDto.getXCoordinate())
					.yCoordinate(stickerDto.getYCoordinate())
					.sticker(sticker)
					.build();
				// 스티커 하나 줄이기
				usedStickerList.add(usedSticker);
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

	@Transactional
	public void minusStickerCnt(DiaryPostRequest request) {
		Member member = memberRepository.findByUsername(request.getMemberUsername())
			.orElseThrow(() -> new RuntimeException("잘못된 username"));
		if (request.getStickerDtoList() != null) {
			for (StickerDto stickerDto : request.getStickerDtoList()) {
				Sticker sticker = stickerRepository.findById(stickerDto.getStickerId())
					.orElseThrow(() -> new RuntimeException("존재하지 않는 스티커"));
				// Unused 스티커 조회해서 리턴
				UnusedSticker unusedSticker = unusedStickerRepository.findByMemberIdAndStickerId(member, sticker);
				// Unused 스티커 cnt -1
				unusedSticker.minusCnt();
			}
		}
	}

	public List<SimpleDiaryDto> getDayDiaryList(String username, String date) {
		Member member = clubService.returnMemberByUsername(username);
		LocalDate targetDay = LocalDate.of(Integer.parseInt(date.substring(0, 4)),
			Integer.parseInt(date.substring(5, 7)),
			Integer.parseInt(date.substring(8, 10)));
		LocalDateTime startDateTime = LocalDateTime.of(targetDay, LocalTime.of(0, 0, 0));
		LocalDateTime endDateTime = LocalDateTime.of(targetDay, LocalTime.of(23, 59, 59));
		List<Diary> personalDiaries = diaryRepository.findPersonalAllByDateAndMemberId(member, startDateTime,
			endDateTime);
		List<Diary> clubDiaries = diaryRepository.findClubAllByDateAndMemberId(member, startDateTime, endDateTime);
		List<SimpleDiaryDto> simpleDtoList = new ArrayList<>();
		for (Diary diary : personalDiaries) {
			// log.info("확인: " + diary.getClub());
			simpleDtoList.add(diary.toPersonalDto());
		}
		for (Diary diary : clubDiaries) {
			// log.info("확인: " + diary.getClub());
			simpleDtoList.add(diary.toClubDto());
		}
		return simpleDtoList;
	}

	public List<UsedStickerDto> getDiarySticker(Long diaryId) {
		Diary diary = diaryRepository.findById(diaryId)
			.orElseThrow(() -> new NotFoundException(diaryId + "번의 일기를 찾을 수 없습니다."));
		List<UsedStickerDto> usedStickerList = new ArrayList<>();

		for (UsedSticker usedSticker : diary.getUsedStickers()) {
			usedStickerList.add(usedSticker.toUsedStickerDto());
		}
		return usedStickerList;
	}
}
