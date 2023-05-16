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
import { postRecommendBySurveyApi } from "../../apis/clubApi";
import useMember from "../../hooks/memberHook";
import {
  TitleSection,
  ProfileSection,
  ApplyButton,
} from "./Recommended.styles";
import { postUserInfoApi } from "../../apis/userApi";

interface Recommendation {
  userId: string;
  rate: number;
}

interface RecommendUserInfo {
  nickname: string;
  gender: string;
  agerange: string;
  rate: number;
}
export default function Recommended() {
  const { memberData } = useMember();

  const [recommendList, setRecommendList] = useState<Recommendation[]>([]);
  const [recommendUserList, setRecommendUserList] = useState<RecommendUserInfo[]>([]);
  useEffect(() => {
    if (recommendList.length === 0) {
      postRecommendBySurveyApi({ userId: memberData.username })
        .then((result) => {
          console.log(result, 'this is result');
          setRecommendList(result.data);
        })
    }
  }, [recommendList]);


  useEffect(() => {
    let initialLoad = true; // Flag to track initial load
  
    if (recommendList.length > 0 && initialLoad) {
      getRecommend(); // Call getRecommend() when recommendList has a value for the first time
      initialLoad = false; // Update the flag to prevent subsequent calls
    }
  }, [recommendList]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await postRecommendBySurveyApi({userId : memberData.username});
  //       // const userdata = await postUserInfoApi({userId : memberData.username})
  //       setRecommendList(data.data);
  //       getRecommend();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (recommendList.length !== 0) {
  //     console.log(recommendList, 'this is recommendList')
  //     console.log(recommendList.length, 'this is length')
  //     getRecommend();
  //   }
  // }, [recommendList]);

  const getRecommend = () => {
    const newdatas: RecommendUserInfo[] = [];
    for (let i = 0; i < recommendList.length; i++) {
      postUserInfoApi({member_id : recommendList[i].userId}).then((result) => {
        if (result.data) {
          let newdata: RecommendUserInfo = {
            nickname: result.data.nickname,
            gender: result.data.gender,
            agerange: result.data.agerange,
            rate: recommendList[i].rate,
          };
          newdatas.push(newdata);
          setRecommendUserList([...recommendUserList, ...newdatas]);
        } else {
          console.error('Invalid data received for user:', recommendList[i].userId);
        }
      });
    }
  };
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
          {recommendUserList.length >= 1
            ? recommendUserList.map((el, idx) => (
                <SwiperSlide key={idx} className="p-2">
                  <Card sx={{ width: 200 }}>
                    <CardMedia sx={{ height: 100 }} image="./assets/male.png"/>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {el.nickname}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        나와 {(el.rate * 100).toFixed(0)}% 유사한 사람이에요!
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {el.agerange}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {el.gender}
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
