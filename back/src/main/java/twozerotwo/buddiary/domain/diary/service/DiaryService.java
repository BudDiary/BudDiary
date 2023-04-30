package twozerotwo.buddiary.domain.diary.service;


import java.io.IOException;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.diary.dto.DiaryPostRequest;
import twozerotwo.buddiary.domain.diary.dto.DiaryPostResponse;
import twozerotwo.buddiary.infra.amazons3.uploader.S3Uploader;
import twozerotwo.buddiary.persistence.entity.Club;
import twozerotwo.buddiary.persistence.entity.Diary;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.repository.ClubRepository;
import twozerotwo.buddiary.persistence.repository.DiaryRepository;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class DiaryService {
	private final MemberRepository memberRepository;
	private final DiaryRepository diaryRepository;
	private final ClubRepository clubRepository;
	private final S3Uploader s3Uploader;
	private final Long WRITE_POINT = 5L;

	public DiaryPostResponse createDiary(DiaryPostRequest request) throws IOException {
		// member 반환
		/// TODO: 2023-04-28 예외처리 변경
		// Member member = memberRepository.findById((Long)request.getMemberId())
		// 	.orElseThrow(()-> new RuntimeException());
		// 사진이 있으면 url 반환
		String imageUrl = null;
		if (request.getDiaryPhoto() != null) {
			imageUrl = s3Uploader.upload(request.getDiaryPhoto(), "Diary");
		}
		// 클럽 있으면 반환
		Diary diary = null;
		if (request.getClubUuid() != null) {
			/// TODO: 2023-04-28 예외처리 변경
			Club club = clubRepository.findById(request.getClubUuid())
				.orElseThrow(()-> new RuntimeException());
			diary = request.makeClubDiary(imageUrl, club);
		} else {
			diary = request.makePersonalDiary(imageUrl);
		}
		// diary = request.makePersonalDiary(imageUrl);
		diaryRepository.save(diary);
		// 포인트 ++
		// member.addPoint(WRITE_POINT);
		// memberRepository.save(member);
		/// TODO: 2023-04-30 닉네임 주입 변경 
		return DiaryPostResponse.builder()
			.id(diary.getId())
			.text(diary.getText())
			.imagePath(imageUrl)
			.writeDate(diary.getWriteDate())
			// .writerNickname(member.getUsername())
			// .writerId(member.getId())
			.build();

	}
}
