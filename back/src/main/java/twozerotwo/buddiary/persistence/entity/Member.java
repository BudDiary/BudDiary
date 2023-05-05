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

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import twozerotwo.buddiary.global.oauth.dto.SocialType;
import twozerotwo.buddiary.persistence.enums.Role;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Member {
	@Id
	@Column(name = "MEMBER_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String username;
	// @Column(nullable = false)
	private String password;
	// 카카오에서 가져온 카카오 이름 ex) 김명영
	private String nickname;
	private String intro;
	@Column(nullable = false)
	@Builder.Default
	private Long point = 0L;
	@Builder.Default
	private LocalDateTime enrollDate = LocalDateTime.now();

	@Enumerated(EnumType.STRING)
	private Role role;
	//민우 요청사항 추가 설문조사
	@Builder.Default
	private boolean checkPreference = false;
	@Builder.Default
	private boolean accountNonLocked = true;
	@Builder.Default
	private boolean enabled = true;
	@Builder.Default
	private boolean accountNotExpired = true;
	@Builder.Default
	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	private Set<MemberClub> memberClubs = new HashSet<>();

	@Builder.Default
	@OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL)
	private List<Notification> notifications = new ArrayList<>();

	@OneToMany(mappedBy = "writer", cascade = CascadeType.ALL)
	private List<Diary> diaries = new ArrayList<>();
	@Builder.Default
	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	private List<UnusedSticker> stickers = new ArrayList<>();

	@Enumerated(EnumType.STRING)
	private SocialType socialType; // KAKAO, NAVER, GOOGLE
	@Builder.Default
	private String socialId = null; // 로그인한 소셜 타입의 식별자 값 (일반 로그인인 경우 null)
	private String refreshToken;

	// 비밀번호 암호화 메소드
	public void passwordEncode(PasswordEncoder passwordEncoder) {
		this.password = passwordEncoder.encode(this.password);
	}

	public void updateRefreshToken(String updateRefreshToken) {
		this.refreshToken = updateRefreshToken;
	}

	public void addPoint(Long point) {
		this.point += point;
	}

}
