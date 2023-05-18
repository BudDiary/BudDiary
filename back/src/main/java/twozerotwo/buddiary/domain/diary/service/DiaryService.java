package twozerotwo.buddiary.domain.diary.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.comment.dto.CommentDto;
import twozerotwo.buddiary.domain.diary.dto.DiaryDetailDto;
import twozerotwo.buddiary.domain.diary.dto.DiaryImageDto;
import twozerotwo.buddiary.domain.diary.dto.DiaryInfo;
import twozerotwo.buddiary.domain.diary.dto.DiaryPostRequest;
import twozerotwo.buddiary.domain.diary.dto.SimpleDiaryDto;
import twozerotwo.buddiary.domain.diary.dto.StickerDto;
import twozerotwo.buddiary.domain.diary.dto.StickerToDiaryDto;
import twozerotwo.buddiary.domain.diary.dto.UsedStickerDto;
import twozerotwo.buddiary.domain.reaction.dto.ReactionDto;
import twozerotwo.buddiary.domain.sticker.service.StickerService;
import twozerotwo.buddiary.global.advice.exception.BadRequestException;
import twozerotwo.buddiary.global.advice.exception.NotFoundException;
import twozerotwo.buddiary.global.util.AuthenticationUtil;
import twozerotwo.buddiary.infra.amazons3.uploader.S3Uploader;
import twozerotwo.buddiary.persistence.entity.Club;
import twozerotwo.buddiary.persistence.entity.Comment;
import twozerotwo.buddiary.persistence.entity.Diary;
import twozerotwo.buddiary.persistence.entity.DiaryImage;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.entity.Reaction;
import twozerotwo.buddiary.persistence.entity.Sticker;
import twozerotwo.buddiary.persistence.entity.UnusedSticker;
import twozerotwo.buddiary.persistence.entity.UsedSticker;
import twozerotwo.buddiary.persistence.repository.ClubRepository;
import twozerotwo.buddiary.persistence.repository.DiaryRepository;
import twozerotwo.buddiary.persistence.repository.UnusedStickerRepository;
import twozerotwo.buddiary.persistence.repository.UsedStickerRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class DiaryService {
	private final DiaryRepository diaryRepository;
	private final ClubRepository clubRepository;
	private final AuthenticationUtil authenticationUtil;
	private final UnusedStickerRepository unusedStickerRepository;
	private final UsedStickerRepository usedStickerRepository;
	private final S3Uploader s3Uploader;
	private final StickerService stickerService;
	private static Long WRITE_DIARY_POINT = 5L;

	@Transactional
	public void createClubDiary(DiaryPostRequest request, String clubUuid, HttpServletRequest servlet) throws
		IOException {
		/// TODO: 2023-05-02 요청한 사람이 클럽원인지 확인
		Club club = returnClubById(clubUuid);
		Member member = authenticationUtil.getMemberEntityFromRequest(servlet);
		// 다이어리 포스트 생성 > 저장
		Diary diary = Diary.builder()
			.club(club)
			.writer(member)
			.text(request.getText())
			.positiveRate(request.getPositiveRate())
			.negativeRate(request.getNegativeRate())
			.build();
		Diary savedDiary = diaryRepository.save(diary);
		// 이미지 리스트 만들고
		makeDiaryImage(savedDiary, request.getFileList());
		// 스티커 리스트 만들고
		makeStickerList(savedDiary, request.getStickerDtoList());

	}

	private Club returnClubById(String clubUuid) {
		Club club = clubRepository.findById(clubUuid)
			.orElseThrow(() -> new BadRequestException("잘못된 클럽 id입니다."));
		return club;
	}

	@Transactional
	public void makeDiaryImage(Diary diary, List<MultipartFile> fileList) throws IOException {
		List<DiaryImage> imgList = diary.getDiaryImages();

		if (fileList.size() > 0) {
			for (MultipartFile file : fileList) {
				String imgUrl = s3Uploader.upload(file, "Diary");
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

		if (stickerDtoList != null && !stickerDtoList.isEmpty()) {
			for (StickerDto stickerDto : stickerDtoList) {
				/// TODO: 2023-05-02 소유 여부 확인 맴버 메소드로 보내기
				Boolean stickerOwned = false;
				for (UnusedSticker ownedSticker : member.getStickers()) {
					if (ownedSticker.getSticker().getImageUrl().equals(stickerDto.getStickerUrl())) {
						stickerOwned = true;
						break;
					}
				}
				if (!stickerOwned) {
					throw new BadRequestException("스티커를 보유하고 있지 않습니다.");
				}
				Sticker sticker = stickerService.returnStickerByUrl(stickerDto.getStickerUrl());

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
	public void createPersonalDiary(DiaryPostRequest request, HttpServletRequest servlet) throws IOException {
		// Member member = clubService.returnMemberByUsername(request.getMemberUsername());
		Member member = authenticationUtil.getMemberEntityFromRequest(servlet);
		// 다이어리 포스트 생성 > 저장
		Diary diary = Diary.builder()
			.writer(member)
			.text(request.getText())
			.positiveRate(request.getPositiveRate())
			.negativeRate(request.getNegativeRate())
			.build();
		Diary savedDiary = diaryRepository.save(diary);
		// 이미지 첨부
		makeDiaryImage(savedDiary, request.getFileList());
		// 스티커 리스트 만들고
		makeStickerList(savedDiary, request.getStickerDtoList());

	}

	@Transactional
	public void minusStickerCnt(DiaryPostRequest request, HttpServletRequest servlet) {
		Member member = authenticationUtil.getMemberEntityFromRequest(servlet);
		// 5 point 추가
		member.addPoint(WRITE_DIARY_POINT);

		if (request.getStickerDtoList() != null) {
			for (StickerDto stickerDto : request.getStickerDtoList()) {
				Sticker sticker = stickerService.returnStickerByUrl(stickerDto.getStickerUrl());
				// Unused 스티커 조회해서 리턴
				UnusedSticker unusedSticker = unusedStickerRepository.findByMemberIdAndStickerId(member, sticker);
				// Unused 스티커 cnt -1
				unusedSticker.minusCnt();
				if (unusedSticker.getCount() <= 0) {
					unusedStickerRepository.delete(unusedSticker);
				}
			}
		}
	}

	@Transactional
	public List<SimpleDiaryDto> getDayDiaryList(HttpServletRequest servlet, String date) {
		// Member member = clubService.returnMemberByUsername(username);
		Member member = authenticationUtil.getMemberEntityFromRequest(servlet);
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
			//다이어리 > diaryInfo로 바꾸는 메소드 필요
			List<ReactionDto> reactionDtos = returnReactionDtoList(diary);
			List<DiaryImageDto> imgDtos = returnImgDtoList(diary);
			List<CommentDto> commentDtos = returnCommentDtoList(diary);
			DiaryInfo diaryInfo = diary.toDiaryInfo(reactionDtos, imgDtos, commentDtos);
			//diaryInfo 인자로 바꿈
			simpleDtoList.add(diary.toPersonalDto(diaryInfo));
		}
		for (Diary diary : clubDiaries) {
			List<ReactionDto> reactionDtos = returnReactionDtoList(diary);
			List<DiaryImageDto> imgDtos = returnImgDtoList(diary);
			List<CommentDto> commentDtos = returnCommentDtoList(diary);
			DiaryInfo diaryInfo = diary.toDiaryInfo(reactionDtos, imgDtos, commentDtos);
			// log.info("확인: " + diary.getClub());
			simpleDtoList.add(diary.toClubDto(diaryInfo));
		}
		return simpleDtoList;
	}

	public List<UsedStickerDto> getDiarySticker(Diary diary) {
		List<UsedStickerDto> usedStickerList = new ArrayList<>();

		for (UsedSticker usedSticker : diary.getUsedStickers()) {
			usedStickerList.add(usedSticker.toUsedStickerDto());
		}
		return usedStickerList;
	}

	public Diary returnDiaryById(Long diaryId) {
		Diary diary = diaryRepository.findById(diaryId)
			.orElseThrow(() -> new NotFoundException(diaryId + "번의 다이어리를 찾을 수 없습니다."));
		return diary;
	}

	@Transactional
	public void deleteDiary(Long diaryId, HttpServletRequest servlet) {
		// Member member = clubService.returnMemberByUsername(username);
		Member member = authenticationUtil.getMemberEntityFromRequest(servlet);
		Diary diary = returnDiaryById(diaryId);

		if (!diary.getWriter().equals(member)) {
			throw new BadRequestException("해당 글의 작성자가 아닙니다.");
		}
		diaryRepository.delete(diary);
	}

	@Transactional
	public List<UsedStickerDto> addStickerToDiary(StickerToDiaryDto request, HttpServletRequest servlet) {
		// log.info(request.getYCoordinate().toString());
		// 소유자가 맞는지 확인
		Diary diary = returnDiaryById(request.getDiaryId());
		UnusedSticker unusedSticker = unusedStickerRepository.findById(request.getUnusedStickerId())
			.orElseThrow(() -> new NotFoundException("미사용 스티커를 찾을 수 없습니다."));
		// Member member = clubService.returnMemberByUsername(request.getUsername());
		Member member = authenticationUtil.getMemberEntityFromRequest(servlet);
		if (!unusedSticker.getMember().equals(member)) {
			throw new BadRequestException("요청자와 소유자가 다릅니다.");
		}

		UsedSticker usedSticker = UsedSticker.builder()
			.diary(diary)
			.xCoordinate(request.getXCoordinate())
			.yCoordinate(request.getYCoordinate())
			.sticker(unusedSticker.getSticker())
			.build();
		// 스티커 ++
		usedStickerRepository.save(usedSticker);
		// 앤드 차감 > 0 되면 삭제
		unusedSticker.minusCnt();
		if (unusedSticker.getCount() <= 0) {
			unusedStickerRepository.delete(unusedSticker);
		}
		return getDiarySticker(diary);
	}

	public List<ReactionDto> returnReactionDtoList(Diary diary) {
		List<Reaction> reactions = diary.getReactions();
		List<ReactionDto> reactionDtos = new ArrayList<>();
		for (Reaction reaction : reactions) {
			reactionDtos.add(reaction.toDto());
		}
		// member point 추가
		return reactionDtos;

	}

	public List<CommentDto> returnCommentDtoList(Diary diary) {
		List<Comment> comments = diary.getComments();
		List<CommentDto> commentDtos = new ArrayList<>();
		for (Comment comment : comments) {
			commentDtos.add(comment.toDto());
		}
		// member point 추가
		return commentDtos;

	}

	public List<DiaryImageDto> returnImgDtoList(Diary diary) {
		List<DiaryImage> diaryImages = diary.getDiaryImages();
		List<DiaryImageDto> diaryImageDtos = new ArrayList<>();
		for (DiaryImage diaryImage : diaryImages) {
			diaryImageDtos.add(diaryImage.toDto());
		}
		return diaryImageDtos;
	}

	@Transactional
	public DiaryDetailDto getDiaryDetail(Long diaryId) {
		Diary diary = returnDiaryById(diaryId);
		List<ReactionDto> reactionDtos = returnReactionDtoList(diary);
		List<DiaryImageDto> imgDtos = returnImgDtoList(diary);
		List<CommentDto> commentDtos = returnCommentDtoList(diary);
		DiaryInfo diaryInfo = diary.toDiaryInfo(reactionDtos, imgDtos, commentDtos);
		SimpleDiaryDto simpleDiaryDto;
		if (diary.getClub() == null) {
			simpleDiaryDto = diary.toPersonalDto(diaryInfo);
		} else {
			simpleDiaryDto = diary.toClubDto(diaryInfo);
		}
		return DiaryDetailDto.builder()
			.simpleDiary(simpleDiaryDto)
			.usedStickers(getDiarySticker(diary))
			.build();
	}
}
