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
import twozerotwo.buddiary.persistence.enums.GroupType;
import twozerotwo.buddiary.persistence.enums.GroupTypeConverter;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Group {
	@Id
	@Column(name = "GROUP_ID")
	@NotBlank
	private String uuid;

	@Column(nullable = false)
	private String name;
	@Builder.Default
	@Convert(converter = GroupTypeConverter.class)
	private GroupType type = GroupType.PLURAL;
	@Builder.Default
	private LocalDateTime createDate = LocalDateTime.now();

	@OneToMany(mappedBy = "group", cascade = CascadeType.REMOVE)
	private Set<MemberGroup> groupMembers = new HashSet<>();

}
