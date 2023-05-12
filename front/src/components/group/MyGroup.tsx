import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { MdLibraryAdd } from "react-icons/md";
import NewGroupDiaryModal from "./NewGroupDiaryModal";
import ModalWindow from "../common/ModalWindow";
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

export default function MyGroup() {
  const [modalOpen, setModalOpen] = useState(false);
  const createNewDiary = () => {
    setModalOpen(true);
  };
  return (
    <>
      {modalOpen && <ModalWindow page={1} setModalOpen={setModalOpen} />}

      {/* {NewDiaryModal === false ? null : <NewGroupDiaryModal setNewDiaryModal={setNewDiaryModal}/>} */}
      <span className="flex">
        <Paper
          className="cursor-pointer"
          elevation={3}
          sx={{
            p: 3,
            minWidth: "150px",
            width: "30%",
            height: "220px",
            mr: "5%",
            mt: "1rem",
          }}
          onClick={createNewDiary}
        >
          <div className="w-full h-full flex flex-col items-center justify-evenly">
            <button>
              <MdLibraryAdd color="blue" size={32} />
            </button>
            <Typography variant="h5" component="div">
              <p className="text-lg">새로운 교환일기</p>
            </Typography>
          </div>
          {/* <img
              src=''
              alt= '대체'
              style={{ width: '100%', marginBottom: '10%' }}
            /> */}
        </Paper>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            // 화면 크기가 1024px 이상일 때
            1024: {
              slidesPerView: 3,
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
      </span>
    </>
  );
}
