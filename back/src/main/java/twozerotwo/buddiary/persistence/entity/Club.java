package twozerotwo.buddiary.persistence.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import twozerotwo.buddiary.domain.club.dto.ClubInfo;
import twozerotwo.buddiary.persistence.enums.ClubType;
import twozerotwo.buddiary.persistence.enums.ClubTypeConverter;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Club {
	@Id
	@Column(name = "CLUB_ID")
	private String uuid;

	@Column
	private String name;
	@Builder.Default
	@Convert(converter = ClubTypeConverter.class)
	private ClubType type = ClubType.PLURAL;
	@Builder.Default
	private LocalDateTime createDate = LocalDateTime.now();
	@Builder.Default
	private String captainUsername = null;

	private Integer maximumMember;
	@Builder.Default
	private String thumbnailPath = null;
	@Builder.Default
	@OneToMany(mappedBy = "club", cascade = CascadeType.ALL)
	private Set<MemberClub> clubMembers = new HashSet<>();

	public ClubInfo toPluralDto() {
		return ClubInfo.builder()
			.clubUuid(this.uuid)
			.thumbnailUrl(this.thumbnailPath)
			.clubName(this.name)
			.build();
	}

	public ClubInfo toDoubleDto(String clubImgUrl) {
		return ClubInfo.builder()
			.clubUuid(this.uuid)
			.thumbnailUrl(clubImgUrl)
			.clubName(this.name)
			.build();
	}

	public void deleteMember(Member member) {
		this.getClubMembers().remove(member);
	}

	public boolean isMaxClubMembersSize(){
		if(this.clubMembers.size() < 3){
			return true;
		}
		return false;
	}
}
