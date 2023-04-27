import React, { useEffect } from "react";
import { useState } from "react";
export default function SurveyPage() {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [myAnswer, setMyAnswer] = useState<string[]>([]);
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
    ["INFP", "INFJ", "INTP", "INTJ", "ISTP", "ISTJ", "ISFP", "ISFJ","ENFP", "ENFJ", "ENTP", "ENTJ", "ESTP", "ESTJ", "ESFP", "ESFJ"],
    ["축구", "농구", "조깅", "헬스", "클라이밍", "골프", "야구", "배드민턴"],
    ["액션", "스릴러", "로맨스", "코미디", "SF", "판타지", "호러", "드라마", "가족", "범죄", "음악", "애니메이션"],
    ["한식", "양식", "중식", "일식"],
    ["화날 때", "기쁠 때"],
    ["여행", "집", "게임", "요리", "독서", "유튜브 시청"],
    ["캐주얼", "스트릿", "빈티지", "댄디", "스포티"]
  ];
  //   1. 좋아하는 음악 장르는? (다중선택 가능) 클래식, 힙합, 락, kpop, 팝송, jpop, cpop, 오페라, 발라드, r&b
  // 2. MBTI: 16개 중 택 1
  // 3. 좋아하는 운동: (다중선택 가능) 축구, 농구, 조깅, 헬스 클라이밍 골프 야구 배트민턴
  // 4. 좋아하는 영화 장르: (다중선택 가능)액션 스릴러 로맨스 코미디 sf 판타지 호러 드라마 가족 범죄 음악 애니메이션
  // 5. 좋아하는 음식종류: (다중선택 가능) 한식 양식 중식 일식
  // 일기를 언제 쓰는지? (화날 때, 기쁠 때, 암때나)
  // 여가시간을 주로 어떻게 보내는가?(다중선택 가능) 여행, 집, 게임, 요리, 독서, 유튜브 시청
  // 나의 패션 스타일: (다중선택 가능) 캐주얼, 스트릿, 빈티지, 댄디, 스포티

  const addMyAnswer = (element: string) => {
    setMyAnswer([...myAnswer, element]);
  };
  const outputNextSentence = () => {
    if (currentSentenceIndex < allSentences.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);
    }
  };
  useEffect(() => {
    console.log(myAnswer)
  }, [myAnswer])
  return (
    <div>
      <p>{allSentences[currentSentenceIndex]}</p>
      {allAnswers[currentSentenceIndex].map((element, index) => (
        <button key={index} onClick={() => addMyAnswer(element)}>
          {element}
        </button>
      ))}

      <br />
      {currentSentenceIndex === 7 ? (
        <button>완료</button>
      ): (
        <button onClick={outputNextSentence}>다음</button>
      )}
      {/* <button onClick={outputNextSentence}>Output next sentence</button> */}
    </div>
  );
}
