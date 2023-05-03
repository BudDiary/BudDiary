package twozerotwo.buddiary.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import twozerotwo.buddiary.persistence.entity.Diary;

public interface DiaryRepository extends JpaRepository<Diary, Long> {

}
