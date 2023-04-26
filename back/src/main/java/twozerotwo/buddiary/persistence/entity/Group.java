package twozerotwo.buddiary.persistence.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import twozerotwo.buddiary.persistence.enums.GroupType;
import twozerotwo.buddiary.persistence.enums.GroupTypeConverter;
import lombok.Builder;

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

	@OneToMany(mappedBy = "group")
	private List<MemberGroup> groupMembers;


}
