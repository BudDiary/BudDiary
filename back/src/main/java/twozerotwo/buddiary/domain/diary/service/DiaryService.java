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

	public DiaryPostResponse createDiary(DiaryPostRequest request) throws IOException {
		// member 반환
		/// TODO: 2023-04-28 예외처리 변경
		Member member = memberRepository.findById(request.getMemberId())
			.orElseThrow(()-> new RuntimeException());
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
			diary = request.makeClubDiary(member, imageUrl, club);
		} else {
			diary = request.makePersonalDiary(member, imageUrl);
		}
		diaryRepository.save(diary);
		return null;


		// 포인트 ++

	}
}
