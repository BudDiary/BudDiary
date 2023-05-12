import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const data = [
  {
    title: "Paper 1",
    description: "This is the description for Paper 1.",
    image: "/path/to/image1.jpg",
  },
  {
    title: "Paper 2",
    description: "This is the description for Paper 2.",
    image: "/path/to/image2.jpg",
  },
  {
    title: "Paper 3",
    description: "This is the description for Paper 3.",
    image: "/path/to/image3.jpg",
  },
  {
    title: "Paper 4",
    description: "This is the description for Paper 3.",
    image: "/path/to/image3.jpg",
  },
  {
    title: "Paper 5",
    description: "This is the description for Paper 3.",
    image: "/path/to/image3.jpg",
  },
];

export default function MyRandom() {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        360: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1440: {
          slidesPerView: 4,
        },
      }}
    >
      {data.map((item, index) => (
        <SwiperSlide key={index} className="py-4 px-1">
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h5" component="div" sx={{ mb: 1 }}>
              {item.title}
            </Typography>
            <img
              src={item.image}
              alt={item.title}
              style={{ width: "100%", height: "100px" }}
            />
            <Typography component="div">{item.description}</Typography>
          </Paper>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
