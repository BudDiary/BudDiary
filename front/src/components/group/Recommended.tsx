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
import { postLiveDoubleInviteApi } from "../../apis/noticeApi";
import useMember from "../../hooks/memberHook";
import male from "../../assets/male.png";
import nullImage from "../../assets/nullImage.png";
import female from "../../assets/female.png";
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
  userId: string;
}
export default function Recommended() {
  const { memberData } = useMember();

  const [recommendList, setRecommendList] = useState<Recommendation[]>([]);
  const [recommendUserList, setRecommendUserList] = useState<
    RecommendUserInfo[]
  >([]);
  const [initialLoad, setInitialLoad] = useState<number>(1);

  useEffect(() => {
    postRecommendBySurveyApi({ userId: memberData.username })
      .then((result) => {
        if (!result.error) {
          setRecommendList(result.data);
          setInitialLoad(2);
        } else {
          console.error(result.error); // Optionally, log the error
        }
      })
      .catch((error) => {
        console.error(error); // Log any unhandled promise rejections
      });
  }, []);
  const handleInviteDouble = (userId: string) => {
    postLiveDoubleInviteApi(userId);
  };

  useEffect(() => {
    if (initialLoad === 2) {
      getRecommend(); // Call getRecommend() when recommendList has a value for the first time
      setInitialLoad(3); // Update the flag to prevent subsequent calls
    }
  }, [recommendList]);

  const getRecommend = () => {
    const newdatas: RecommendUserInfo[] = [];
    if (recommendList) {
      for (let i = 0; i < recommendList.length; i++) {
        postUserInfoApi({ member_id: recommendList[i].userId }).then(
          (result) => {
            if (result.data) {
              let newdata: RecommendUserInfo = {
                nickname: result.data.nickname,
                gender: result.data.gender,
                agerange: result.data.ageRange,
                rate: recommendList[i].rate,
                userId: recommendList[i].userId,
              };
              newdatas.push(newdata);
              setRecommendUserList([...recommendUserList, ...newdatas]);
            } else {
              console.error(
                "Invalid data received for user:",
                recommendList[i].userId
              );
            }
          }
        );
      }
    }
  };
  return (
    <>
      <TitleSection>
        이런 사람과 교환일기를 작성해 보는 건 어떤가요?
      </TitleSection>
      <hr />
      <br />
      <ProfileSection>
        <Swiper
          slidesPerView={1}
          breakpoints={{
            // 화면 크기가 500px 이상일 때
            450: {
              slidesPerView: 2,
            },
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
                    {el.gender === "male" ? (
                      <CardMedia
                        component="img"
                        sx={{ height: 100 }}
                        image={male}
                      />
                    ) : el.gender === "female" ? (
                      <CardMedia
                        component="img"
                        sx={{ height: 100 }}
                        image={female}
                      />
                    ) : (
                      <CardMedia
                        component="img"
                        sx={{ height: 100 }}
                        image={nullImage}
                      />
                    )}

                    <CardContent sx={{ height: 130, marginTop: "10px" }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {el.nickname}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        나와의 유사도 : {(el.rate * 100).toFixed(0)}%
                      </Typography>
                      {el.agerange !== null && (
                        <Typography variant="body2" color="text.secondary">
                          {el.agerange.substring(0, 2)} 대
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions>
                      <ApplyButton
                        onClick={() => handleInviteDouble(el.userId)}
                      >
                        그룹일기 신청하기
                      </ApplyButton>
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
