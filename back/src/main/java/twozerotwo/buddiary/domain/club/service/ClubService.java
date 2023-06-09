package twozerotwo.buddiary.domain.club.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.club.dto.ClubCreateResponse;
import twozerotwo.buddiary.domain.club.dto.ClubDetail;
import twozerotwo.buddiary.domain.club.dto.ClubInfo;
import twozerotwo.buddiary.domain.club.dto.DoubleCreateRequest;
import twozerotwo.buddiary.domain.club.dto.MyClubDto;
import twozerotwo.buddiary.domain.club.dto.PluralCreateRequest;
import twozerotwo.buddiary.domain.comment.dto.CommentDto;
import twozerotwo.buddiary.domain.diary.dto.DiaryImageDto;
import twozerotwo.buddiary.domain.diary.dto.DiaryInfo;
import twozerotwo.buddiary.domain.diary.service.DiaryService;
import twozerotwo.buddiary.domain.reaction.dto.ReactionDto;
import twozerotwo.buddiary.global.advice.exception.BadRequestException;
import twozerotwo.buddiary.global.advice.exception.NotFoundException;
import twozerotwo.buddiary.global.util.AuthenticationUtil;
import twozerotwo.buddiary.infra.amazons3.uploader.S3Uploader;
import twozerotwo.buddiary.persistence.entity.Club;
import twozerotwo.buddiary.persistence.entity.Diary;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.entity.MemberClub;
import twozerotwo.buddiary.persistence.enums.ClubType;
import twozerotwo.buddiary.persistence.repository.ClubRepository;
import twozerotwo.buddiary.persistence.repository.DiaryRepository;
import twozerotwo.buddiary.persistence.repository.MemberClubRepository;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClubService {
	private static final Long CREATE_DOUBLE_POINT = 10L;
	private final ClubRepository clubRepository;
	private final DiaryRepository diaryRepository;
	private final MemberRepository memberRepository;
	private final MemberClubRepository memberClubRepository;
	private final S3Uploader s3Uploader;
	private final AuthenticationUtil authenticationUtil;
	private final DiaryService diaryService;

	@Transactional
	public ClubCreateResponse createDouble(DoubleCreateRequest request, HttpServletRequest servlet) {
		Member me = authenticationUtil.getMemberEntityFromRequest(servlet);

		// 맴버 리스트 생성
		List<Member> memberList = new ArrayList<>();
		Member target = returnMemberByUsername(request.getTargetName());
		memberList.add(target);
		memberList.add(me);
		// 클럽 생성
		Club club = Club.builder()
			.uuid(UUID.randomUUID().toString())
			.type(ClubType.DOUBLE)
			.name(target.getNickname() + "님과 " + me.getNickname() + "님의 교환일기")
			.maximumMember(2)
			.build();
		//맴버들 반환
		clubRepository.save(club);
		Set<MemberClub> clubMembers = club.getClubMembers();
		// 중계 테이블 레코드 생성
		for (Member member : memberList) {
			clubMembers.add(createMemberClub(member, club));
		}
		// point 추가
		target.addPoint(CREATE_DOUBLE_POINT);
		me.addPoint(CREATE_DOUBLE_POINT);

		// dto로 반환
		return ClubCreateResponse.builder().type(ClubType.DOUBLE.getCode()).uuid(club.getUuid()).build();
	}

	@Transactional
	public ClubCreateResponse createPlural(PluralCreateRequest request, HttpServletRequest servlet) throws IOException {
		Member captain = authenticationUtil.getMemberEntityFromRequest(servlet);
		// Member captain = returnMemberByUsername(request.getCaptainUsername());

		String imageUrl = s3Uploader.upload(request.getThumbnail(), "Club");

		Club club = Club.builder()
			.uuid(UUID.randomUUID().toString())
			.name(request.getClubName())
			.maximumMember(30)
			.thumbnailPath(imageUrl)
			.type(ClubType.PLURAL)
			.captainUsername(captain.getUsername())
			.build();
		clubRepository.save(club);
		club.getClubMembers().add(createMemberClub(captain, club));
		captain.addPoint(20L);
		// log.info("createMemberClub" + club.getClubMembers().toString());

		return ClubCreateResponse.builder().type(ClubType.PLURAL.getCode()).uuid(club.getUuid()).build();
	}

	@Transactional
	public MemberClub createMemberClub(Member member, Club club) {
		MemberClub memberClub = MemberClub.builder().member(member).club(club).build();

		return memberClubRepository.save(memberClub);
	}

	public Member returnMemberByUsername(String username) {
		Member member = memberRepository.findByUsername(username)
			.orElseThrow(() -> new NotFoundException(username + "회원을 찾을 수 없습니다."));
		return member;
	}

	@Transactional
	public MyClubDto getMyClub(HttpServletRequest servlet) {
		// Member me = returnMemberByUsername(username);
		Member me = authenticationUtil.getMemberEntityFromRequest(servlet);
		Set<MemberClub> memberClubs = me.getMemberClubs();
		List<ClubInfo> pluralList = new ArrayList<>();
		List<ClubInfo> doubleList = new ArrayList<>();
		for (MemberClub memberClub : memberClubs) {
			// 클럽 조회해서
			Club club = memberClub.getClub();
			ClubType type = club.getType();

			if (type.equals(ClubType.PLURAL)) {
				pluralList.add(club.toPluralDto());
			} else if (type.equals(ClubType.DOUBLE)) {
				// 클럽원 돌면서 .. 나랑 같지 않으면 그사람 프사를 그룹 이미지로
				String clubImgUrl = null;
				for (MemberClub clubMember : club.getClubMembers()) {
					Member member = clubMember.getMember();
					if (!member.equals(me)) {
						clubImgUrl = member.getProfilePath();
					}
				}
				doubleList.add(club.toDoubleDto(clubImgUrl));
			}
			// 다수, 1:1로 분리해서 저장
		}
		return MyClubDto.builder().doubleList(doubleList).pluralList(pluralList).build();
	}

	@Transactional
	public ClubDetail getClubDetail(String clubUuid, HttpServletRequest servlet) {
		Member member = authenticationUtil.getMemberEntityFromRequest(servlet);

		Club club = returnClubById(clubUuid);
		Set<MemberClub> memberClubs = club.getClubMembers();
		boolean isClubMember = false;
		List<Member> members = new ArrayList<>();
		for (MemberClub memberClub : memberClubs) {
			if (memberClub.getMember().getId().equals(member.getId())) {
				isClubMember = true;
			}
			members.add(memberClub.getMember());
		}
		if (!isClubMember) {
			throw new BadRequestException("클럽원의 요청이 아닙니다.");
		}
		List<Diary> diaries = diaryRepository.findAllByClubIdOrOrderByWriteDateDesc(club);
		List<DiaryInfo> diaryInfos = new ArrayList<>();
		for (Diary diary : diaries) {
			List<ReactionDto> reactionDtos = diaryService.returnReactionDtoList(diary);
			List<DiaryImageDto> imgDtos = diaryService.returnImgDtoList(diary);
			List<CommentDto> commentDtos = diaryService.returnCommentDtoList(diary);
			diaryInfos.add(diary.toDiaryInfo(reactionDtos, imgDtos, commentDtos));
		}
		String clubImgUrl = club.getThumbnailPath();
		ClubInfo clubInfo;
		if (club.getType().equals(ClubType.DOUBLE)) {
			for (MemberClub memberClub : club.getClubMembers()) {
				if (!memberClub.getMember().equals(member)) {
					clubImgUrl = memberClub.getMember().getProfilePath();
					break;
				}
			}
			clubInfo = club.toDoubleDto(clubImgUrl);
		} else {
			clubInfo = club.toPluralDto();
		}

		return ClubDetail.builder().diaryList(diaryInfos).memberList(members).clubInfo(clubInfo).build();
	}

	@Transactional
	public void deleteMemberAtClub(String clubUuid, HttpServletRequest servlet) {
		Member member = authenticationUtil.getMemberEntityFromRequest(servlet);

		Club club = returnClubById(clubUuid);
		// boolean isClubMember = false;
		Set<MemberClub> clubMembers = club.getClubMembers();
		MemberClub target = null;
		for (MemberClub memberClub : clubMembers) {
			if (memberClub.getMember().equals(member)) {
				// 외래키 다 지우고 삭제해야 함
				target = memberClub;
			}
		}
		if (target == null) {
			throw new BadRequestException("요청자가 해당 클럽의 구성원이 아닙니다.");
		} else {
			club.getClubMembers().remove(target);
			member.getMemberClubs().remove(target);
			memberClubRepository.delete(target);
		}
		// clubRepository.save(club);
	}

	public Club returnClubById(String clubUuid) {
		Club club = clubRepository.findById(clubUuid).orElseThrow(() -> new NotFoundException("해당 클럽을 찾을 수 없습니다."));
		return club;
	}

	@Transactional
	public void addMember(HttpServletRequest request, String clubId) {
		Member memberFromToken = authenticationUtil.getMemberEntityFromRequest(request);
		Club club = returnClubById(clubId);
		Set<MemberClub> clubMembers = club.getClubMembers();
		MemberClub buildMemberClub = MemberClub.builder().member(memberFromToken).club(club).build();
		MemberClub memberClub = memberClubRepository.findMemberClubByClubAndMember(club, memberFromToken).orElse(null);
		if (club.isMaxClubMembersSize()) {
			throw new BadRequestException("회원이 가득찬 클럽입니다.");
		}
		if (memberClub != null) {
			throw new BadRequestException("중복된 회원입니다");
		}
		clubMembers.add(buildMemberClub);
	}
}
