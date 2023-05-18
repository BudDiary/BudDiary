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
import { PostRecommendBykeyWordApi } from "../../apis/clubApi";
import useMember from "../../hooks/memberHook";
import male from "../../assets/male.png";
import female from "../../assets/female.png";
import nullImage from "../../assets/nullImage.png";
import {
  TitleSection,
  ProfileSection,
  ApplyButton,
} from "./Recommended.styles";
import { postUserInfoApi } from "../../apis/userApi";

interface Recommendation {
  userId: string;
  words: string[];
}

interface RecommendUserInfo {
  nickname: string;
  gender: string;
  agerange: string;
  keywords: string[];
  userId: string;
}
export default function RecommendedByKeyword() {
  const { memberData } = useMember();

  const [recommendList, setRecommendList] = useState<Recommendation[]>([]);
  const [recommendUserList, setRecommendUserList] = useState<
    RecommendUserInfo[]
  >([]);
  const [initialLoad, setInitialLoad] = useState<number>(1);
  useEffect(() => {
    PostRecommendBykeyWordApi({ userId: memberData.username })
      .then((result) => {
        if (!result.error) {
          console.log(result, "this is keyword recommend result");
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

  useEffect(() => {
    // let initialLoad = true; // Flag to track initial load

    if (initialLoad === 2) {
      getRecommend(); // Call getRecommend() when recommendList has a value for the first time
      setInitialLoad(3); // Update the flag to prevent subsequent calls
    }
  }, [recommendList]);

  const getRecommend = () => {
    const newdatas: RecommendUserInfo[] = [];

    if (recommendList) {
      for (let i = 0; i < recommendList.length; i++) {
        console.log(recommendList[i], "final test");

        postUserInfoApi({ member_id: recommendList[i].userId }).then(
          (result) => {
            if (result.data) {
              console.log(result.data, "this is result data22");
              let newdata: RecommendUserInfo = {
                nickname: result.data.nickname,
                gender: result.data.gender,
                agerange: result.data.ageRange,
                keywords: recommendList[i].words,
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
      <TitleSection>일기 내용을 기반으로 한 추천 리스트 입니다.</TitleSection>
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
                    <CardContent sx={{ height: 150 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {el.nickname}
                      </Typography>

                      <Typography
                        gutterBottom
                        variant="body1"
                        color="text.first"
                      >
                        겹치는 키워드:
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body1"
                        color="text.first"
                      >
                        {el.keywords.length >= 3
                          ? el.keywords.slice(0, 3).join(", ")
                          : el.keywords.slice(0, el.keywords.length)}
                      </Typography>

                      {el.agerange !== null && (
                        <Typography variant="body2" color="text.secondary">
                          {el.agerange.substring(0, 2)} 대
                        </Typography>
                      )}
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
