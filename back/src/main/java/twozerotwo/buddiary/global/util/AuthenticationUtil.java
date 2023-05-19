package twozerotwo.buddiary.global.util;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import twozerotwo.buddiary.domain.member.dto.MemberDto;
import twozerotwo.buddiary.global.advice.exception.BadRequestException;
import twozerotwo.buddiary.global.advice.exception.NotFoundException;
import twozerotwo.buddiary.global.jwt.service.JwtService;
import twozerotwo.buddiary.global.oauth.dto.SocialType;
import twozerotwo.buddiary.persistence.entity.Member;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

@Component
@AllArgsConstructor
public class AuthenticationUtil {
	private final JwtService jwtService;
	private final MemberRepository memberRepository;

	/**
	 * 조회용 dto 반환
	 *
	 * @param request
	 * @return
	 */
	@Transactional
	public MemberDto getMemberDtoFromRequest(HttpServletRequest request) {
		String accessToken = jwtService.extractAccessToken(request)
			.orElseThrow(() -> new BadRequestException("쿠키의 accessToken 이 비정상입니다."));
		String socialId = jwtService.extractSocialId(accessToken)
			.orElseThrow(() -> new BadRequestException("accessToken 의 양식이 잘못되었습니다."));
		String socialType = jwtService.extractSocialType(accessToken)
			.orElseThrow(() -> new BadRequestException("accessToken 의 양식이 잘못되어 있습니다"));
		SocialType tokenSocialType = SocialType.of(socialType);
		Member member = memberRepository.findBySocialTypeAndSocialId(tokenSocialType, socialId)
			.orElseThrow(() -> new NotFoundException("member 가 존재하지 않습니다."));
		return member.toDto();
	}

	/**
	 * 업데이트 용 엔티티 반환
	 *
	 * @param request
	 * @return
	 */
	@Transactional
	public Member getMemberEntityFromRequest(HttpServletRequest request) {
		String accessToken = jwtService.extractAccessToken(request)
			.orElseThrow(() -> new BadRequestException("쿠키의 accessToken 이 비정상입니다."));
		String socialId = jwtService.extractSocialId(accessToken)
			.orElseThrow(() -> new BadRequestException("accessToken 의 양식이 잘못되었습니다."));
		String socialType = jwtService.extractSocialType(accessToken)
			.orElseThrow(() -> new BadRequestException("accessToken 의 양식이 잘못되어 있습니다"));
		SocialType tokenSocialType = SocialType.of(socialType);
		Member member = memberRepository.findBySocialTypeAndSocialId(tokenSocialType, socialId)
			.orElseThrow(() -> new NotFoundException("member 가 존재하지 않습니다."));
		return member;
	}

}
