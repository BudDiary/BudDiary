package twozerotwo.buddiary.domain.club.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import twozerotwo.buddiary.domain.club.dto.ClubCreateResponse;
import twozerotwo.buddiary.domain.club.dto.DoubleCreateRequest;
import twozerotwo.buddiary.domain.club.dto.PluralCreateRequest;
import twozerotwo.buddiary.persistence.entity.Club;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.entity.MemberClub;
import twozerotwo.buddiary.persistence.enums.ClubType;
import twozerotwo.buddiary.persistence.repository.ClubRepository;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClubService {
	private final ClubRepository clubRepository;
	private final MemberRepository memberRepository;

	@Transactional
	public ClubCreateResponse createDouble(DoubleCreateRequest request) {
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
		Set<MemberClub> clubMembers = club.getClubMembers();

		for (Member member : memberList) {
			clubMembers.add(createMemberClub(member, club));
		}
		clubRepository.save(club);
		return ClubCreateResponse.builder()
			.type(ClubType.DOUBLE.getCode())
			.uuid(club.getUuid())
			.build();

	}

	private MemberClub createMemberClub(Member member, Club club) {
		return MemberClub.builder()
			.member(member)
			.club(club)
			.build();
	}

	private Member returnMemberByUsername(String username) {
		Member member = memberRepository.findByUsername(username)
			.orElseThrow(() -> new RuntimeException("dd"));
		return member;
	}

	public ClubCreateResponse createPlural(PluralCreateRequest request) {
		return null;
	}
}
