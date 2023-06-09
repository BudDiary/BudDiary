import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import { BiArrowBack } from "react-icons/bi";
import Button from "@mui/joy/Button";
import { useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import {
  CloseModalButton,
  ModalTitle,
  ModalTopNavContainer,
} from "../../components/common/ModalWindow.styles";
import { MoveIndex, SurveyButton, Tag } from "./SurveyModal.styles";
import { firstSurveyApi } from "../../apis/surveyApi";
import useMember from "../../hooks/memberHook";
import { LinearProgress } from "@mui/material";
import { postUserInfoApi } from "../../apis/userApi";
// import { fastApi } from "./axiosConfig";

// // 다수 클럽 생성
// const postPluralClubApi = (payload: any) => {
//   return formApi.post(`api/clubs/plural`,payload,  { withCredentials: true })
//   .then((res) => {
//       console.log(res)
//       return res.data;
//     })
//     .catch((err) => {
//       Swal.fire({
//         icon: 'error',
//         text: 'postPluralClubApi 오류가 발생했어요.'
//       })
//       console.log(err);
//       return err;
//     });
// }

interface Props {
  closeModal: any;
}

export default function SurveyModal({ closeModal }: Props) {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [myAnswer, setMyAnswer] = useState<string[]>([]);
  const swiper = useSwiper();
  const { memberData } = useMember();

  const closeSurvey = () => {
    console.log({ userId: memberData.username, favor_list: myAnswer });
    firstSurveyApi({ userId: memberData.username, favor_list: myAnswer });
    closeModal();
  };
  // const postPluralClubApi = (payload: any) => {
  //   return formApi.post(`api/clubs/plural`,payload,  { withCredentials: true })
  //   .then((res) => {
  //       console.log(res)
  //       return res.data;
  //     })
  //     .catch((err) => {
  //       Swal.fire({
  //         icon: 'error',
  //         text: 'postPluralClubApi 오류가 발생했어요.'
  //       })
  //       console.log(err);
  //       return err;
  //     });
  // }
  useEffect(() => {
    if (swiper) {
      swiper.slideNext();
    }
  }, [swiper]);
  const allSentences = [
    "1. 좋아하는 음악 장르는? (다중선택 가능)",
    "2. 나의 MBTI는?",
    "3. 좋아하는 운동은? (다중선택 가능)",
    "4. 좋아하는 영화 장르는? (다중선택 가능)",
    "5. 좋아하는 음식 종류는? (다중선택 가능)",
    "6. 일기를 주로 언제 쓰세요? (다중선택 가능)",
    "7. 여가시간을 주로 어떻게 보내세요? (다중선택 가능)",
    "8. 나의 패션 스타일은? (다중선택 가능)",
  ];
  const allAnswers = [
    [
      "클래식",
      "힙합",
      "락",
      "K-POP",
      "팝송",
      "J-POP",
      "C-POP",
      "오페라",
      "발라드",
      "R&B",
    ],
    [
      "INFP",
      "INFJ",
      "INTP",
      "INTJ",
      "ISTP",
      "ISTJ",
      "ISFP",
      "ISFJ",
      "ENFP",
      "ENFJ",
      "ENTP",
      "ENTJ",
      "ESTP",
      "ESTJ",
      "ESFP",
      "ESFJ",
    ],
    ["축구", "농구", "조깅", "헬스", "클라이밍", "골프", "야구", "배드민턴"],
    [
      "액션",
      "스릴러",
      "로맨스",
      "코미디",
      "SF",
      "판타지",
      "호러",
      "드라마",
      "가족",
      "범죄",
      "음악",
      "애니메이션",
    ],
    ["한식", "양식", "중식", "일식"],
    ["화날 때", "기쁠 때"],
    ["여행", "집", "게임", "요리", "독서", "유튜브 시청"],
    ["캐주얼", "스트릿", "빈티지", "댄디", "스포티"],
  ];
  // 1. 좋아하는 음악 장르는? (다중선택 가능) 클래식, 힙합, 락, kpop, 팝송, jpop, cpop, 오페라, 발라드, r&b
  // 2. MBTI: 16개 중 택 1
  // 3. 좋아하는 운동: (다중선택 가능) 축구, 농구, 조깅, 헬스 클라이밍 골프 야구 배트민턴
  // 4. 좋아하는 영화 장르: (다중선택 가능)액션 스릴러 로맨스 코미디 sf 판타지 호러 드라마 가족 범죄 음악 애니메이션
  // 5. 좋아하는 음식종류: (다중선택 가능) 한식 양식 중식 일식
  // 6. 일기를 언제 쓰는지? (화날 때, 기쁠 때, 암때나)
  // 7. 여가시간을 주로 어떻게 보내는가?(다중선택 가능) 여행, 집, 게임, 요리, 독서, 유튜브 시청
  // 8. 나의 패션 스타일: (다중선택 가능) 캐주얼, 스트릿, 빈티지, 댄디, 스포티

  const addMyAnswer = (element: string) => {
    if (myAnswer.includes(element)) {
      setMyAnswer(myAnswer.filter((answer) => answer !== element));
    } else {
      setMyAnswer([...myAnswer, element]);
    }
  };

  const addMyAnswer2 = (element: string) => {
    if (myAnswer.includes(element)) {
      setMyAnswer(myAnswer.filter((answer) => answer !== element));
    } else {
      setMyAnswer([element]);
    }
  };
  const outputPrevSentence = () => {
    if (
      currentSentenceIndex < allSentences.length &&
      currentSentenceIndex > 0
    ) {
      setCurrentSentenceIndex(currentSentenceIndex - 1);
    }
  };
  const outputNextSentence = () => {
    if (
      currentSentenceIndex < allSentences.length - 1 &&
      currentSentenceIndex >= 0
    ) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);
    }
  };

  useEffect(() => {
    console.log(myAnswer);
  }, [myAnswer]);
  return (
    <Modal
      className="font-hassam text-2xl"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={true}
      // onClose={() => closeSurvey()}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        style={{ width: "50%", minWidth: "360px" }}
        sx={{
          minHeight: 300,
          borderRadius: "md",
          // p: 5,
          boxShadow: "lg",
        }}
      >
        <ModalTopNavContainer>
          <CloseModalButton onClick={closeSurvey}>
            {/* <BiArrowBack /> */}
          </CloseModalButton>
          <ModalTitle style={{}}>초기 설문조사</ModalTitle>
          {currentSentenceIndex === allSentences.length - 1 ? (
            <Button className="text-center" onClick={closeSurvey}>
              완료
            </Button>
          ) : (
            <SurveyButton onClick={closeSurvey}>완료</SurveyButton>
          )}
        </ModalTopNavContainer>
        <div>
          <p className="w-full text-center my-2 text-bold">
            {allSentences[currentSentenceIndex]}
          </p>

          <LinearProgress
            className="mx-4"
            variant="determinate"
            value={currentSentenceIndex * 14.28}
          />
          <div
            className="mx-4 my-4 flex flex-wrap justify-center"
            style={{ minHeight: "100px" }}
          >
            {allAnswers[currentSentenceIndex].map((element, index) => {
              return (
                <Tag
                  style={{ minWidth: "100px" }}
                  key={index}
                  onClick={() => {
                    if (currentSentenceIndex === 1) {
                      addMyAnswer2(element);
                    } else {
                      addMyAnswer(element);
                    }
                  }}
                  select={myAnswer.indexOf(element) !== -1 ? true : false}
                >
                  {element}
                </Tag>
              );
            })}
          </div>

          <MoveIndex>
            {currentSentenceIndex > 0 ? (
              <Button onClick={outputPrevSentence}>이전</Button>
            ) : null}
            {currentSentenceIndex < 7 ? (
              <Button onClick={outputNextSentence}>다음</Button>
            ) : null}
          </MoveIndex>
        </div>
      </Sheet>
    </Modal>
  );
}
