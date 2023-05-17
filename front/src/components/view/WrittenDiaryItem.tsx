import React from "react";
import { DiaryItemContainer, DiaryTypeBox } from "./WrittenDiaryItem.styles";
import { Divider } from "@mui/material";
import { BiLinkExternal } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { DiaryImageSlider } from "../groupdetail/Diaries.styles";
import { Swiper, SwiperSlide } from "swiper/react";
import excited from "../../assets/excited.png"
import happy from "../../assets/happy.png"
import normal from "../../assets/normal.png"
import sad from "../../assets/sad.png"
import crying from "../../assets/crying.png"

interface Props {
  id: number;
  type: string;
  club: any;
  pics: any;
  content: string;
  date: any;
  negative: number;
  positive: number;
}

export default function WrittenDiaryItem({
  id,
  type,
  club,
  pics,
  content,
  date,
  negative,
  positive,
}: Props) {
  const navigate = useNavigate();

  const getFeelingRate = (negative: number, positive: number) => {
    const feelingRate = positive - negative;
    let image = "";

    if (feelingRate >= -100 && feelingRate < -60) {
      image = crying;
    } else if (feelingRate >= -60 && feelingRate < -20) {
      image = sad;
    } else if (feelingRate >= -20 && feelingRate < 20) {
      image = normal;
    } else if (feelingRate >= 20 && feelingRate < 60) {
      image = happy;
    } else if (feelingRate >= 60 && feelingRate <= 100) {
      image = excited;
    }

    return image;
  };

  return (
    <DiaryItemContainer>
      <DiaryTypeBox>
        {type === "PERSONAL" ? "비밀일기" : `${club.clubName}그룹일기`}
      </DiaryTypeBox>
      <div style={{ display: 'flex', alignItems: 'center' }}>

      <div>{new Date(date).toLocaleString()}</div>
      <img src={getFeelingRate(negative, positive)} alt=""  style={{ maxWidth: '50px', maxHeight: '50px', marginLeft: 'auto' }} />
      </div>
      <Divider style={{ border: "solid 1px #BFDBFE", marginBlock: "10px" }} />

      <div className="grid-cols-2">
        {pics?.length > 0 && (
          <DiaryImageSlider>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop={true}
            >
              {pics.map((pic: any, index: any) => (
                <SwiperSlide key={index}>
                  <img src={pic.imgUrl} alt="일기 사진입니다." />
                </SwiperSlide>
              ))}
            </Swiper>
          </DiaryImageSlider>
        )}
        <div className="min-h-[200px] pt-2 px-4">{content}</div>
      </div>

      {/* <div>{negative}</div>
      <div>{positive}</div> */}
      <div className="flex justify-end sm:mr-10">
        <button
          className="font-berry flex"
          onClick={() => navigate(`/decorate/${id}`)}
        >
          다꾸 페이지 보러가기
          <BiLinkExternal className="my-auto ml-1" />
        </button>
      </div>
    </DiaryItemContainer>
  );
}
