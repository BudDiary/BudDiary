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
// @JsonIgnoreProperties({"name", "price"})
public class Sticker {
	@Id
	@Column(name = "STICKER_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("stickerId")
	private Long id;
	private String imageUrl;
	@Size(min = 1, max = 20)
	@Column(unique = true)
	// @JsonProperty("name")
	private String name;

	// @JsonProperty("price")
	private Long price;
}
