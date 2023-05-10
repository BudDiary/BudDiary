package twozerotwo.buddiary.domain.member.service;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import twozerotwo.buddiary.domain.member.dto.MemberDto;
import twozerotwo.buddiary.domain.member.dto.MemberSignUpRequest;
import twozerotwo.buddiary.global.advice.exception.BadRequestException;
import twozerotwo.buddiary.global.advice.exception.ConflictException;
import twozerotwo.buddiary.global.util.AuthenticationUtil;
import twozerotwo.buddiary.infra.amazons3.uploader.S3Uploader;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;
	private final AuthenticationUtil authenticationUtil;
	private final S3Uploader s3Uploader;

	private static final String MEMBER_PROFILE_DIR = "Profile";

	@Transactional
	public MemberDto signUp(MemberSignUpRequest userSignUpDto, HttpServletRequest request) throws IOException {
		Member memberDtoFromRequest = authenticationUtil.getMemberEntityFromRequest(request);
		if (memberRepository.findByUsername(userSignUpDto.getNickname()).isPresent()) {
			throw new ConflictException("이미 존재하는 유저의 이메일입니다.");
		}
		if (!userSignUpDto.getProfilePic().isEmpty()) {
			log.info("들어 왔습니다.");
			String memberProfile = s3Uploader.upload(userSignUpDto.getProfilePic(), MEMBER_PROFILE_DIR);
			Member signup = memberDtoFromRequest.signup(userSignUpDto.getNickname(), memberProfile);
			return signup.toDto();
		}
		Member signup = memberDtoFromRequest.signup(userSignUpDto.getNickname(), null);
		return signup.toDto();
	}

	@Transactional
	public Optional<String> updateNickname(String nickname, HttpServletRequest request) {
		if (nickname == null || nickname.trim().isEmpty()) {
			throw new BadRequestException("닉네임이 비어 있습니다");
		} else if (!(nickname.length() >= 2 && nickname.length() <= 8)) {
			throw new BadRequestException("닉네임 의 길이는 2이상 8 이하입니다.");
		} else if (StringUtils.containsWhitespace(nickname)) {
			throw new BadRequestException("닉네임은 공백을 포함하면안됩니다");
		}

		Member targetMember = authenticationUtil.getMemberEntityFromRequest(request);
		String updateNickname = targetMember.updateNickname(nickname);
		return Optional.of(updateNickname);

	}

	@Transactional
	public Optional<String> updateIntro(String intro, HttpServletRequest request) {
		if (!(intro.length() <= 200)) {
			throw new BadRequestException("소개 의 길이는 200 자 이하입니다.");
		}
		Member targetMember = authenticationUtil.getMemberEntityFromRequest(request);
		String updatedIntro = targetMember.updateIntro(intro);
		return Optional.of(updatedIntro);
	}

	@Transactional
	public Optional<String> updateProfilePath(MultipartFile updateProfile, HttpServletRequest request) throws
		IOException {

		Member targetMember = authenticationUtil.getMemberEntityFromRequest(request);
		if (!updateProfile.getOriginalFilename().isEmpty()) {
			String uploadedFile = s3Uploader.upload(updateProfile, MEMBER_PROFILE_DIR);
			String updatedFile = targetMember.updateProfilePath(uploadedFile);
			return Optional.of(updatedFile);
		} else {
			String updatedFile = targetMember.updateProfilePath(null);
			return Optional.of(updatedFile);
		}

	}
}
