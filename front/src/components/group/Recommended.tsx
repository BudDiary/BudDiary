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
import { TitleSection, ProfileSection } from "./Recommended.styles";

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
        console.log(data.data);
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
        <Swiper slidesPerView={5}>
          {recommendList.length >=1 ? recommendList.map((el, idx) => (
            <SwiperSlide key={idx} className="p-2">
              <Card sx={{ width: 200 }}>
                <CardMedia sx={{ height: 100 }} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {el.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {el.rate}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" size="large">
                    그룹일기 신청하기
                  </Button>
                </CardActions>
              </Card>
            </SwiperSlide>
          )): null}
        </Swiper>
      </ProfileSection>
    </>
  );
}
