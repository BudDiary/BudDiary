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
}
export default function Recommended() {
  const { memberData } = useMember();

  const [recommendList, setRecommendList] = useState<Recommendation[]>([]);
  const [recommendUserList, setRecommendUserList] = useState<
    RecommendUserInfo[]
  >([]);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await postRecommendBySurveyApi({
          userId: memberData.username,
        });
        setRecommendList(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const handleInviteDouble = (userId: string) => {
    postLiveDoubleInviteApi(userId);
  };

  useEffect(() => {
    // let initialLoad = true; // Flag to track initial load

    if (recommendList.length > 0 && initialLoad) {
      getRecommend(); // Call getRecommend() when recommendList has a value for the first time
      setInitialLoad(false); // Update the flag to prevent subsequent calls
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
      postUserInfoApi({ member_id: recommendList[i].userId }).then((result) => {
        if (result.data) {
          console.log(result.data, "this is result data");
          let newdata: RecommendUserInfo = {
            nickname: result.data.nickname,
            gender: result.data.gender,
            agerange: result.data.ageRange,
            rate: recommendList[i].rate,
          };
          newdatas.push(newdata);
          setRecommendUserList([...recommendUserList, ...newdatas]);
        } else {
          console.error(
            "Invalid data received for user:",
            recommendList[i].userId
          );
        }
      });
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

                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {el.nickname}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        나와 {(el.rate * 100).toFixed(0)}% 유사한 사람이에요!
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
