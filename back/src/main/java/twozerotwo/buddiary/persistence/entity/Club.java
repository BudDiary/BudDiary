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
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
	@NotBlank
	private String uuid;

	@Column(nullable = false)
	private String name;
	@Builder.Default
	@Convert(converter = ClubTypeConverter.class)
	private ClubType type = ClubType.PLURAL;
	@Builder.Default
	private LocalDateTime createDate = LocalDateTime.now();

	@OneToMany(mappedBy = "club", cascade = CascadeType.REMOVE)
	private Set<MemberClub> groupMembers = new HashSet<>();

}
