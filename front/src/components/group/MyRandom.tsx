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
          setDoubleList(result.data.doubleList);
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
      spaceBetween={20}
      slidesPerView={1}
      // breakpoints={{
      //   360: {
      //     slidesPerView: 1,
      //   },
      //   640: {
      //     slidesPerView: 2,
      //   },
      //   1024: {
      //     slidesPerView: 3,
      //   },
      //   1440: {
      //     slidesPerView: 4,
      //   },
      // }}
    >
      {doubleList.length >= 1
        ? doubleList.map((item, index) => (
            <SwiperSlide key={index} className="py-4 px-1">
              <Paper elevation={3} sx={{ p: 2 }}>
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
