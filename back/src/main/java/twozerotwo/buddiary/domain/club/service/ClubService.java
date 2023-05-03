package twozerotwo.buddiary.domain.club.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.dto.ClubCreateResponse;
import twozerotwo.buddiary.domain.club.dto.DoubleCreateRequest;
import twozerotwo.buddiary.domain.club.dto.PluralCreateRequest;
import twozerotwo.buddiary.infra.amazons3.uploader.S3Uploader;
import twozerotwo.buddiary.persistence.entity.Club;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.entity.MemberClub;
import twozerotwo.buddiary.persistence.enums.ClubType;
import twozerotwo.buddiary.persistence.repository.ClubRepository;
import twozerotwo.buddiary.persistence.repository.MemberClubRepository;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClubService {
	private final ClubRepository clubRepository;
	private final MemberRepository memberRepository;
	private final MemberClubRepository memberClubRepository;
	private final S3Uploader s3Uploader;

	@Transactional
	public ClubCreateResponse createDouble(DoubleCreateRequest request) {
		// 맴버 리스트 생성
		List<Member> memberList = new ArrayList<>();
		Member firstMember = returnMemberByUsername(request.getFirstUsername());
		memberList.add(firstMember);
		Member secondMember = returnMemberByUsername(request.getSecondUsername());
		memberList.add(secondMember);
		// 클럽 생성
		Club club = Club.builder()
			.uuid(UUID.randomUUID().toString())
			.type(ClubType.DOUBLE)
			.name(firstMember.getUsername() + secondMember.getUsername())
			.maximumMember(2)
			.build();
		//맴버들 반환
		clubRepository.save(club);
		Set<MemberClub> clubMembers = club.getClubMembers();
		// 중계 테이블 레코드 생성
		for (Member member : memberList) {
			clubMembers.add(createMemberClub(member, club));
		}
		log.info(club.getClubMembers().toString());

		// dto로 반환
		return ClubCreateResponse.builder()
			.type(ClubType.DOUBLE.getCode())
			.uuid(club.getUuid())
			.build();
	}

	@Transactional
	public ClubCreateResponse createPlural(PluralCreateRequest request) throws IOException {
		Member captain = returnMemberByUsername(request.getCaptainUsername());

		String imageUrl = uploadS3(request.getThumbnail(), "Club");

		Club club = Club.builder()
			.uuid(UUID.randomUUID().toString())
			.name(request.getClubName())
			.maximumMember(30)
			.thumbnailPath(imageUrl)
			.type(ClubType.PLURAL)
			.captainUsername(request.getCaptainUsername()).build();
		clubRepository.save(club);
		club.getClubMembers().add(createMemberClub(captain, club));
		log.info("createMemberClub" + club.getClubMembers().toString());

		return ClubCreateResponse.builder()
			.type(ClubType.PLURAL.getCode())
			.uuid(club.getUuid())
			.build();
	}

	public String uploadS3(MultipartFile file, String dirName) throws IOException {
		if (file.isEmpty()) {
			throw new RuntimeException("gg");
		} else {
			return s3Uploader.upload(file, dirName);
		}
	}

	@Transactional
	public MemberClub createMemberClub(Member member, Club club) {
		MemberClub memberClub = MemberClub.builder()
			.member(member)
			.club(club)
			.build();

		return memberClubRepository.save(memberClub);
	}

	private Member returnMemberByUsername(String username) {
		Member member = memberRepository.findByUsername(username)
			.orElseThrow(() -> new RuntimeException("dd"));
		return member;
	}

}
