import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { MdLibraryAdd } from "react-icons/md";
import NewGroupDiaryModal from "./NewGroupDiaryModal";
import ModalWindow from "../common/ModalWindow";
import { getMyClubListApi } from "../../apis/clubApi";

interface PluralList {
  captainUsername: string | null;
  clubName: string;
  clubUuid: string;
  thumbnailUrl: string | undefined;
}

export default function MyGroup() {
  const [modalOpen, setModalOpen] = useState(false);
  const createNewDiary = () => {
    setModalOpen(true);
  };

  const [pluralList, setPluralList] = useState<PluralList[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMyClubListApi();
        setPluralList(data.pluralList);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
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
              <MdLibraryAdd size={32} className="text-bud-pink" />
            </button>
            <Typography variant="h5" component="div">
              <p className="text-lg">새로운 교환일기</p>
            </Typography>
          </div>
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
          {pluralList?.map((group) => (
            <SwiperSlide key={group.clubUuid} className="py-4 px-1">
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                  {group.clubName}
                </Typography>
                <img
                  src={group.thumbnailUrl}
                  alt={group.clubName}
                  style={{ width: "100%", height: "100px" }}
                />
              </Paper>
            </SwiperSlide>
          ))}
        </Swiper>
      </span>
    </>
  );
}
