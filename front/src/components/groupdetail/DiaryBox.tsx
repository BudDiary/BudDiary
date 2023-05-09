import React, { useState, useEffect } from "react";

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
import { Diary, Image } from "../../types/group";
SwiperCore.use([Navigation, Pagination, Autoplay]);

interface DiaryBoxProps {
  diaryList?: Diary[];
  imgList?: Image[];
}
export default function DiaryBox({ diaryList }: DiaryBoxProps) {
  const [diaryData, setDiaryData] = useState<Diary[]>([]);

  useEffect(() => {
    // 다이어리 데이터 로드
    setDiaryData(diaryList ?? []);
  }, []);

  return (
    <>
      {diaryData.length === 0 ? (
        <DiaryDetail
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            paddingBlock: "150px",
          }}
        >
          <div>
            <LogoBlue style={{ fontSize: "50px", fontWeight: "bold" }}>
              Bud
            </LogoBlue>
            <LogoGreen style={{ fontSize: "50px", fontWeight: "bold" }}>
              :(
            </LogoGreen>
            <LogoBlue style={{ fontSize: "50px", fontWeight: "bold" }}>
              iary
            </LogoBlue>
          </div>
          <div>
            <h1>공유하고 있는 다이어리가 없습니다.</h1>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1>다이어리를 작성해주세요.</h1>
              <LogoGreen style={{ fontWeight: "bold" }}>:D</LogoGreen>
            </div>
          </div>
        </DiaryDetail>
      ) : (
        <>
          {diaryData.length > 0 &&
            diaryData.map((diary) => (
              <DiaryDetail key={diary.diaryId}>
                <DiaryHeader>
                  <img src={diary.writer.profilePath ?? ""} alt="프로필" />
                  <div>
                    <h2>
                      {diary.writer.nickname}
                      {userdummy.nickname === diary.writer.nickname && (
                        <DeleteButton
                          style={{ fontSize: "12px" }}
                          onClick={() => DiaryDelete(diary.diaryId)}
                        >
                          삭제
                        </DeleteButton>
                      )}
                    </h2>
                    <h3>{new Date(diary.writeDate).toLocaleString()}</h3>
                  </div>
                </DiaryHeader>
                <DiaryContent>
                  {diary.imgList?.length > 0 && (
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
                            <img src={image.imgUrl} alt="일기 사진입니다." />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </DiaryImageSlider>
                  )}
                  <DiaryText>
                    <p style={{ marginTop: 0 }}>{diary.text}</p>
                  </DiaryText>
                </DiaryContent>
                <DiaryComment
                  key={diary.diaryId}
                  diaryId={diary.diaryId}
                  commentList={diary.commentList}
                />
              </DiaryDetail>
            ))}
        </>
      )}
    </>
  );
}
