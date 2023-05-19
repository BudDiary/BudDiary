import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  DiaryDetail,
  DiaryHeader,
  DiaryContent,
  DiaryImageSlider,
  DiaryText,
  BlankNotice,
  BlankDiary,
  EmojiButton,
  DiaryDetailBlank,
  ReactionSet,
} from "./Diaries.styles";
import { useNavigate } from "react-router-dom";
import { LogoBlue, LogoGreen } from "../navbar/NavBar.styles";
import DiaryComment from "./DiaryComment";
import { DeleteButton } from "../common/Button.styles";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
import { Divider } from "@mui/material";
import useMember from "../../hooks/memberHook";
import EmojiCount from "./emoji/EmojiCount";
import EmojiPicker from "./emoji/EmojiPicker";
import { Diary, Image, Info, Club } from "../../types/group";
import DiaryDelete from "./DiaryDelete";
import excited from "../../assets/excited.png";
import happy from "../../assets/happy.png";
import normal from "../../assets/normal.png";
import sad from "../../assets/sad.png";
import crying from "../../assets/crying.png";
import { BiLinkExternal } from "react-icons/bi";

SwiperCore.use([Navigation, Pagination, Autoplay]);

interface DiaryBoxProps {
  diaryList?: Diary[];
  clubInfo?: Info;
  imgList?: Image[];
  setClubData: Dispatch<SetStateAction<Club | null>>;
}

interface SelectedEmojis {
  [diaryId: number]: string[] | undefined;
}

export default function DiaryBox({
  diaryList,
  clubInfo,
  setClubData,
}: DiaryBoxProps) {
  const navigate = useNavigate();
  const [diaryData, setDiaryData] = useState<Diary[]>([]);
  const [feelingRateData, setFeelingRateData] = useState<{
    [diaryId: number]: string;
  }>({});
  const { memberData } = useMember();
  // 일기 삭제 모달
  const [diaryDelete, setDiaryDelete] = useState(false);
  const [selectedDiaryId, setSelectedDiaryId] = useState<number | null>(null);
  const [selectedDiaryEmojis, setSelectedDiaryEmojis] =
    useState<SelectedEmojis>({});

  const showDeleteModal = (diaryId: number) => {
    setSelectedDiaryId(diaryId);
    setDiaryDelete(true);
  };
  const handleCloseModal = () => {
    setDiaryDelete(false);
  };

  const getFeelingRate = (negative: number, positive: number) => {
    const feelingRate = positive - negative;
    let image = "";

    if (feelingRate >= -100 && feelingRate < -60) {
      image = crying;
    } else if (feelingRate >= -60 && feelingRate < -20) {
      image = sad;
    } else if (feelingRate >= -20 && feelingRate < 20) {
      image = normal;
    } else if (feelingRate >= 20 && feelingRate < 60) {
      image = happy;
    } else if (feelingRate >= 60 && feelingRate <= 100) {
      image = excited;
    }

    return image;
  };

  useEffect(() => {
    setDiaryData(diaryList ?? []);

    const calculatedFeelingRateData: { [diaryId: number]: string } = {};
    diaryList?.forEach((diary) => {
      const { negativeRate, positiveRate } = diary;
      calculatedFeelingRateData[diary.diaryId] = getFeelingRate(
        negativeRate,
        positiveRate
      );
    });

    setFeelingRateData(calculatedFeelingRateData);
  }, [diaryList]);

  const handleSelectEmoji = (emoji: string, diaryId: number) => {
    const selectedEmojis = selectedDiaryEmojis[diaryId] || [];
    const updatedEmojis = selectedEmojis.includes(emoji)
      ? selectedEmojis.filter((e) => e !== emoji)
      : [...selectedEmojis, emoji];

    setSelectedDiaryEmojis((prev) => ({
      ...prev,
      [diaryId]: updatedEmojis,
    }));
  };

  return (
    <>
      {diaryData.length === 0 ? (
        <DiaryDetailBlank>
          <BlankNotice>
            <LogoBlue>Bud</LogoBlue>
            <LogoGreen>:(</LogoGreen>
            <LogoBlue>iary</LogoBlue>
          </BlankNotice>
          <BlankDiary>
            <h1>공유하고 있는 다이어리가 없습니다.</h1>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1>다이어리를 작성해주세요.</h1>
              <LogoGreen>:D</LogoGreen>
            </div>
          </BlankDiary>
        </DiaryDetailBlank>
      ) : (
        <>
          {diaryData.length > 0 &&
            diaryData.map((diary) => (
              <DiaryDetail key={diary.diaryId}>
                <DiaryHeader>
                  <img src={diary.writer.profilePath ?? ""} alt="프로필" />
                  <div>
                    <h2>
                      {diary.writer.nickname}
                      {diaryDelete && selectedDiaryId === diary.diaryId && (
                        <DiaryDelete
                          key={diary.diaryId}
                          isOpen={false}
                          diary={diary}
                          diaryId={diary.diaryId}
                          clubInfo={clubInfo}
                          setClubData={setClubData}
                          onClose={handleCloseModal}
                        />
                      )}
                      {memberData.username === diary.writer.username && (
                        <DeleteButton
                          style={{ fontSize: "12px" }}
                          onClick={() => showDeleteModal(diary.diaryId)}
                        >
                          삭제
                        </DeleteButton>
                      )}
                    </h2>
                    <h3>{new Date(diary.writeDate).toLocaleString()}</h3>
                  </div>
                  {/* <img
                    src={getFeelingRate(diary.negativeRate, diary.positiveRate)}
                    alt=""
                    style={{
                      maxWidth: "50px",
                      maxHeight: "50px",
                      marginLeft: "auto",
                    }}
                  /> */}
                </DiaryHeader>
                <Divider
                  style={{ border: "solid 2px #BFDBFE", marginBlock: "10px" }}
                />
                <DiaryContent>
                  {diary.imgList?.length > 0 && (
                    <DiaryImageSlider>
                      <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        loop={true}
                      >
                        {diary.imgList.map((image, index) => (
                          <SwiperSlide key={index}>
                            <img src={image.imgUrl} alt="일기 사진입니다." />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </DiaryImageSlider>
                  )}
                  <div>
                    <div className="flex justify-end sm:mr-10">
                      <button
                        className="font-berry flex"
                        onClick={() => navigate(`/decorate/${diary.diaryId}`)}
                      >
                        다꾸 페이지 보러가기
                        <BiLinkExternal className="my-auto ml-1" />
                      </button>
                    </div>
                    <div className="h-[2px] w-[100%] bg-red-200 my-2"></div>
                    <DiaryText>
                      <p>{diary.text}</p>
                    </DiaryText>
                  </div>
                </DiaryContent>

                <ReactionSet>
                  <div>
                    <EmojiCount reactionList={diary.reactionList} />
                    <EmojiButton
                      onClick={() =>
                        setSelectedDiaryId((prev) =>
                          prev === diary.diaryId ? null : diary.diaryId
                        )
                      }
                    >
                      +😀
                    </EmojiButton>
                  </div>
                  {selectedDiaryId === diary.diaryId && (
                    <div>
                      <EmojiPicker
                        reactionList={diary.reactionList}
                        onSelect={(emoji) =>
                          handleSelectEmoji(emoji, diary.diaryId)
                        }
                        diaryId={diary.diaryId}
                        clubInfo={clubInfo}
                        setClubData={setClubData}
                      />
                    </div>
                  )}
                </ReactionSet>
                <DiaryComment
                  key={diary.diaryId}
                  diaryId={diary.diaryId}
                  commentList={diary.commentList}
                  clubInfo={clubInfo}
                  setClubData={setClubData}
                />
              </DiaryDetail>
            ))}
        </>
      )}
    </>
  );
}
