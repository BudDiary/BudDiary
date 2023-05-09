import React from "react";
import diaryData from "./diaryData.json";
import {
  DiaryDetail,
  DiaryHeader,
  DiaryContent,
  DiaryImageSlider,
  DiaryText,
} from "./Diaries.styles";
import { DiaryDelete } from "./groupdetailapis/groupdetailapis";
import { LogoBlue, LogoGreen } from "../navbar/NavBar.styles";
import DiaryComment from "./DiaryComment";
import { DeleteButton } from "../common/Button.styles";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
import { userdummy } from "../mypage/userdummy";
SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function DiaryBox() {
  if (diaryData.length === 0) {
    return (
      <DiaryDetail>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LogoBlue style={{ fontSize: "50px" }}>Bud</LogoBlue>
          <LogoGreen style={{ fontSize: "50px" }}>:(</LogoGreen>
          <LogoBlue style={{ fontSize: "50px" }}>iary</LogoBlue>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1 style={{ fontSize: "25px", fontWeight: "bold" }}>
            공유된 다이어리가 없습니다.
          </h1>
          <h1 style={{ fontSize: "25px", fontWeight: "bold" }}>
            다이어리를 추가해 주세요
          </h1>
          <LogoGreen>:D</LogoGreen>
        </div>
      </DiaryDetail>
    );
  }

  return (
    <>
      {diaryData.length > 0 &&
        diaryData.map((diary) => (
          <DiaryDetail key={diary.id}>
            <DiaryHeader>
              <img src={diary.user_thumbnail} alt="프로필" />
              <div>
                <h2 style={{ fontWeight: "bold" }}>
                  {diary.nickname}
                  {userdummy.nickname === diary.nickname && (
                    <DeleteButton
                      style={{ fontSize: "12px" }}
                      onClick={() => DiaryDelete(diary.id)}
                    >
                      삭제
                    </DeleteButton>
                  )}
                </h2>
                <h3>{diary.user_updated_at}</h3>
              </div>
            </DiaryHeader>
            <DiaryContent>
              {diary.imgList && (
                <DiaryImageSlider>
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                  >
                    {diary.imgList.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img src={image} alt="일기 사진입니다." />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </DiaryImageSlider>
              )}
              <DiaryText>
                <p style={{ marginTop: 0 }}>{diary.content}</p>
              </DiaryText>
            </DiaryContent>
            <DiaryComment key={diary.id} diaryId={diary.id} />
          </DiaryDetail>
        ))}
    </>
  );
}
