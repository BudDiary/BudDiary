import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getRecommendBySurveyApi } from "../../apis/clubApi";
import useMember from "../../hooks/memberHook";
import {
  TitleSection,
  ProfileSection,
  ApplyButton,
} from "./Recommended.styles";

interface Recommendation {
  id: number;
  rate: number;
}
export default function Recommended() {
  const { memberData } = useMember();

  const [recommendList, setRecommendList] = useState<Recommendation[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecommendBySurveyApi(memberData.id);
        setRecommendList(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <TitleSection>
        <Typography variant="h5" component="h5">
          이런 사람과 교환일기를 작성해 보는 건 어떤가요?
        </Typography>
      </TitleSection>
      <hr />
      <br />
      <ProfileSection>
        <Swiper
          slidesPerView={0}
          breakpoints={{
            // 화면 크기가 640px 이상일 때
            640: {
              slidesPerView: 3,
            },
            // 화면 크기가 768px 이상일 때
            768: {
              slidesPerView: 4,
            },
            // 화면 크기가 1024px 이상일 때
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {recommendList.length >= 1
            ? recommendList.map((el, idx) => (
                <SwiperSlide key={idx} className="p-2">
                  <Card sx={{ width: 200 }}>
                    <CardMedia sx={{ height: 100 }} />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {el.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        나와 {el.rate * 100}% 유사한 사람이에요!
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <ApplyButton>그룹일기 신청하기</ApplyButton>
                    </CardActions>
                  </Card>
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </ProfileSection>
    </>
  );
}
