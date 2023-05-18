import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { getMyClubListApi } from "../../apis/clubApi";

interface DoubleList {
  captainUsername: string | null;
  clubName: string;
  clubUuid: string;
  thumbnailUrl: string | undefined;
}

export default function MyRandom() {
  const [doubleList, setDoubleList] = useState<DoubleList[]>([]);
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const data = await getMyClubListApi();
  //       setDoubleList(data.doubleList);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fetchData();
  // }, []);
  useEffect(() => {
    getMyClubListApi()
      .then((result) => {
        if (!result.error) {
          setDoubleList(result.doubleList);
          console.log(result, 'this is double')
        } else {
          console.error(result.error); // Optionally, log the error
        }
      })
      .catch((error) => {
        console.error(error); // Log any unhandled promise rejections
      });
  }, []);
  return (
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
      {doubleList.length >= 1
        ? doubleList.map((item, index) => (
            <SwiperSlide key={index} className="py-4 px-1">
              <Paper style={{ height: "300px" }} sx={{ p: 2 }}>
                <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                  {item.clubName}
                </Typography>
                <img
                  src={item.thumbnailUrl}
                  alt={item.clubName}
                  style={{ width: "100%", height: "100px" }}
                />
                <Typography component="div">{item.clubName}</Typography>
              </Paper>
            </SwiperSlide>
          ))
        : null}
    </Swiper>
  );
}
