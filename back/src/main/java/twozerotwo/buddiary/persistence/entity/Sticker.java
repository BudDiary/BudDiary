package twozerotwo.buddiary.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@JsonIgnoreProperties({"name", "price"})
public class Sticker {
	@Id
	@Column(name = "STICKER_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank(message = "스티커 이미지 url이 없습니다.")
	private String imageUrl;
	@Size(min = 1, max = 20, message = "스티커 이름은 1자 이상 20자 이하여야 합니다.")
	@Column(unique = true)
	@JsonProperty("name")
	private String name;
	@NotBlank(message = "스티커 가격을 설정하지 않았습니다.")
	@JsonProperty("price")
	private Long price;
}
