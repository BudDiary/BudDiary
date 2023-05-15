package twozerotwo.buddiary.persistence.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import twozerotwo.buddiary.domain.member.dto.MemberDto;
import twozerotwo.buddiary.global.advice.exception.BadRequestException;
import twozerotwo.buddiary.global.oauth.dto.SocialType;
import twozerotwo.buddiary.persistence.enums.Role;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Member {
	@Id
	@Column(name = "MEMBER_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String username;
	// @Column(nullable = false)
	@JsonIgnore
	private String password;
	// 카카오에서 가져온 카카오 이름 ex) 김명영
	@Builder.Default
	private String nickname = null;
	@JsonIgnore
	private String intro;
	@JsonIgnore
	@Column(nullable = false)
	@Builder.Default
	private Long point = 0L;
	// @JsonProperty("enrollDate")
	@JsonIgnore
	@Builder.Default
	private LocalDateTime enrollDate = LocalDateTime.now();

	@Builder.Default
	@Column(length = 2000)
	private String profilePath = null;
	@JsonIgnore
	@Enumerated(EnumType.STRING)
	private Role role;
	//민우 요청사항 추가 설문조사
	// @JsonProperty("checkPreference")
	@JsonIgnore
	@Builder.Default
	@Column(length = 2000)
	private String phoneNumber = null;
	@JsonIgnore
	@Builder.Default
	private String gender = null;
	@JsonIgnore

	@Builder.Default
	private String ageRange = null;
	@JsonIgnore
	@Builder.Default
	private boolean checkPreference = false;
	// @JsonProperty("accountNonLocked")
	@JsonIgnore
	@Builder.Default
	private boolean accountNonLocked = true;
	// @JsonProperty("enabled")
	@JsonIgnore
	@Builder.Default
	private boolean enabled = true;
	// @JsonProperty("accountNotExpired")
	@JsonIgnore
	@Builder.Default
	private boolean accountNotExpired = true;
	// @JsonProperty("memberClubs")
	@JsonIgnore
	@Builder.Default
	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	private Set<MemberClub> memberClubs = new HashSet<>();
	// @JsonProperty("notifications")
	@JsonIgnore
	@Builder.Default
	@OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL)
	private List<Notification> notifications = new ArrayList<>();
	// @JsonProperty("diaries")
	@JsonIgnore
	@Builder.Default
	@OneToMany(mappedBy = "writer", cascade = CascadeType.ALL)
	private List<Diary> diaries = new ArrayList<>();
	// @JsonProperty("stickers")
	@JsonIgnore
	@Builder.Default
	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	private List<UnusedSticker> stickers = new ArrayList<>();
	// @JsonProperty("socialType")
	@JsonIgnore
	@Enumerated(EnumType.STRING)
	private SocialType socialType; // KAKAO, NAVER, GOOGLE
	// @JsonProperty("socialId")
	@JsonIgnore
	@Builder.Default
	@Column(unique = true)
	private String socialId = null; // 로그인한 소셜 타입의 식별자 값 (일반 로그인인 경우 null)
	// @JsonProperty("refreshToken")

	// 비밀번호 암호화 메소드
	public void passwordEncode(PasswordEncoder passwordEncoder) {
		this.password = passwordEncoder.encode(this.password);
	}

	public void addPoint(Long point) {
		this.point += point;
	}

	public MemberDto toDto() {
		return MemberDto.builder()
			.username(this.username)
			.nickname(this.nickname)
			.profilePath(this.profilePath)
			.intro(this.intro)
			.point(this.point)
			.socialId(this.socialId)
			.socialType(this.socialType)
			.gender(this.gender)
			.ageRange(this.ageRange)
			.build();
	}

	public Member signup(String nickname, String profilePath) {
		this.nickname = nickname;
		this.role = Role.USER;
		this.profilePath = profilePath;
		return this;
	}

	public boolean checkPoint(Long totalPrice) {
		if (this.point >= totalPrice) {
			return true;
		}
		return false;
	}

	public void minusPoint(Long totalPrice) {
		if (this.point - totalPrice < 0) {
			throw new BadRequestException("포인트가 부족합니다.");
		}
		this.point -= totalPrice;
	}

	public String updateIntro(String intro) {

		this.intro = intro;
		return this.intro;
	}

	public String updateNickname(String nickname) {
		if (nickname == null) {
			throw new BadRequestException("닉네임이 널입니다.");
		}
		this.nickname = nickname;
		return this.nickname;
	}

	public String updateProfilePath(String profilePath) {
		this.profilePath = profilePath;
		return this.profilePath;
	}
}
