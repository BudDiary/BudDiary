import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { MdLibraryAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import NewGroupDiaryModal from "./NewGroupDiaryModal";
import ModalWindow from "../common/ModalWindow";
import { getMyClubListApi } from "../../apis/clubApi";
import { getClubDetailApi } from "../../apis/clubApi";
import { ApplyButton } from "./Recommended.styles";
import { GroupTitle } from "./MyGroup.styles";
import crown from "../../assets/group/crown.png";

interface PluralList {
  captainUsername: string | null;
  clubName: string;
  clubUuid: string;
  thumbnailUrl: string | undefined;
  clubType: string;
}

export default function MyGroup() {
  const [modalOpen, setModalOpen] = useState(false);
  const createNewDiary = () => {
    setModalOpen(true);
  };

  const [pluralList, setPluralList] = useState<PluralList[]>([]);
  const [memberData, setMemberData] = useState<any[]>([]); // Update the type to 'any[]'

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

  const navigate = useNavigate();

  const handleGroupClick = (clubUuid: string) => {
    navigate(`/group/${clubUuid}`);
  };

  useEffect(() => {
    pluralList.forEach((group) => {
      getClubDetailApi(group.clubUuid)
        .then((response) => {
          setMemberData((prevMemberData) => [
            ...prevMemberData,
            ...response.clubDetail.memberList,
          ]);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, [pluralList]);

  return (
    <>
      {modalOpen && <ModalWindow page={1} setModalOpen={setModalOpen} />}

      <span className="flex">
        <Paper
          className="cursor-pointer"
          elevation={3}
          sx={{
            p: 3,
            minWidth: "150px",
            width: "25%",
            height: "300px",
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
              <p className="text-lg">그룹일기 시작하기</p>
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
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {pluralList?.map((group) => {
            const clubCaptain = memberData.find(
              (member) =>
                member.username === group.captainUsername ||
                member.nickname.includes(group.captainUsername)
            );

            return (
              <SwiperSlide key={group.clubUuid} className="py-4 px-1">
                <Paper style={{ height: "300px" }} elevation={3} sx={{ p: 2 }}>
                  <img
                    src={group.thumbnailUrl}
                    alt={group.clubName}
                    style={{ width: "100%", height: "150px" }}
                  />
                  <GroupTitle>
                    <Typography
                      component="div"
                      sx={{
                        mb: 1,
                        fontSize: "20px",
                        maxHeight: "25px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {group.clubName}
                    </Typography>
                  </GroupTitle>

                  <p
                    style={{
                      display: "flex",
                      textAlign: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <img
                      src={crown}
                      alt=""
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                      }}
                    />
                    <span>{clubCaptain?.nickname}</span>
                  </p>

                  <ApplyButton onClick={() => handleGroupClick(group.clubUuid)}>
                    그룹 방문하기
                  </ApplyButton>
                </Paper>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </span>
    </>
  );
}
