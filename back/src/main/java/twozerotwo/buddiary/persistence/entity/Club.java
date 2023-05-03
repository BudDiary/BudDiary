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
import twozerotwo.buddiary.domain.club.dto.ClubDto;
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

	public ClubDto toPluralDto() {
		return ClubDto.builder()
			.clubUuid(this.uuid)
			.thumbnailUrl(this.thumbnailPath)
			.name(this.name)
			.build();
	}

	public ClubDto toDoubleDto(String clubImgUrl) {
		return ClubDto.builder()
			.clubUuid(this.uuid)
			.thumbnailUrl(clubImgUrl)
			.name(this.name)
			.build();
	}
}
