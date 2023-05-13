import React, { useState, useEffect } from "react";
import {
  DiaryDetail,
  DiaryHeader,
  DiaryContent,
  DiaryImageSlider,
  DiaryText,
  BlankNotice,
  BlankDiary,
  BasicButton,
  DiaryDetailBlank,
  ReactionSet,
} from "./Diaries.styles";
import { LogoBlue, LogoGreen } from "../navbar/NavBar.styles";
import DiaryComment from "./DiaryComment";
import { DeleteButton } from "../common/Button.styles";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
import useMember from "../../hooks/memberHook";
import EmojiCount from "./emoji/EmojiCount";
import EmojiPicker from "./emoji/EmojiPicker";
import { Diary, Image } from "../../types/group";
import DiaryDelete from "./DiaryDelete";

SwiperCore.use([Navigation, Pagination, Autoplay]);

interface DiaryBoxProps {
  diaryList?: Diary[];
  imgList?: Image[];
}
export default function DiaryBox({ diaryList }: DiaryBoxProps) {
  const [diaryData, setDiaryData] = useState<Diary[]>([]);

  const { memberData } = useMember();
  // 일기 삭제 모달
  const [diaryDelete, setDiaryDelete] = useState(false);
  const [selectedDiaryId, setSelectedDiaryId] = useState<number | null>(null);
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);

  const showDeleteModal = (diaryId: number) => {
    setSelectedDiaryId(diaryId);
    setDiaryDelete(true);
  };
  const handleCloseModal = () => {
    setDiaryDelete(false);
  };

  useEffect(() => {
    setDiaryData(diaryList ?? []);
  }, [diaryList]);

  const handleSelectEmoji = (emoji: string, diaryId: number) => {
    if (selectedEmojis.includes(emoji)) {
      setSelectedEmojis(selectedEmojis.filter((e) => e !== emoji));
    } else {
      setSelectedEmojis([...selectedEmojis, emoji]);
    }
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
                </DiaryHeader>
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
                  <DiaryText>
                    <p>{diary.text}</p>
                  </DiaryText>
                </DiaryContent>

                <ReactionSet>
                  <div>
                    <EmojiCount reactionList={diary.reactionList} />
                    <BasicButton
                      onClick={() =>
                        setSelectedDiaryId((prev) =>
                          prev === diary.diaryId ? null : diary.diaryId
                        )
                      }
                    >
                      +😀
                    </BasicButton>
                  </div>
                  {selectedDiaryId === diary.diaryId && (
                    <EmojiPicker
                      reactionList={diary.reactionList}
                      onSelect={(emoji) =>
                        handleSelectEmoji(emoji, diary.diaryId)
                      }
                      selectedEmojis={selectedEmojis}
                      diaryId={diary.diaryId}
                    />
                  )}
                </ReactionSet>
                <DiaryComment
                  key={diary.diaryId}
                  diaryId={diary.diaryId}
                  commentList={diary.commentList}
                />
              </DiaryDetail>
            ))}
        </>
      )}
    </>
  );
}
