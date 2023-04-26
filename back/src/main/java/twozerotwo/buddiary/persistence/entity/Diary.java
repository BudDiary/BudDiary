package twozerotwo.buddiary.persistence.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Builder;

public class Diary {
	@Id
	@Column(name = "DIARY_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false, length = 1000)
	private String text;
	@Column(nullable = false)
	private String photoPath;
	@Builder.Default
	private LocalDateTime writeDate = LocalDateTime.now();

	//그룹, 맴버




}
