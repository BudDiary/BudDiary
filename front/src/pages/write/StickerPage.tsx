import React, { useRef, useState, useEffect } from "react";
import { ContentBox, StickerListTitle } from "./WritePage.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import navimg from "../../assets/subnav/WirteDiary.jpg";
import interact from "interactjs";
import useMember from "../../hooks/memberHook";
import { PageContainer } from "../../components/common/Page.styles";
import {
  postTodayDiaryApi,
  postSentimentApi,
  postKeywordApi,
} from "../../apis/diaryApi";
import { useNavigate } from "react-router-dom";

interface Props {
  setStage: React.Dispatch<React.SetStateAction<number>>;
  content: string;
  pics: any;
  groups: any;
  personal: boolean;
}

// interface StickerListProps {
//   captainUsername: string | null;
//   clubName: string;
//   clubUuid: string;
//   thumbnailUrl: string | undefined;
//   clubType: string;
// }

interact(".sticker-item").draggable({
  onmove: (event: any) => {
    const target = event.target;
    const dataX = target.getAttribute("data-x");
    const dataY = target.getAttribute("data-y");
    const initialX = parseFloat(dataX) || 0;
    const initialY = parseFloat(dataY) || 0;
    const deltaX = event.dx;
    const deltaY = event.dy;
    const newX = initialX + deltaX;
    const newY = initialY + deltaY;

    target.style.transform = `translate(${newX}px, ${newY}px)`;

    target.setAttribute("data-x", newX);
    target.setAttribute("data-y", newY);
  },
  onend: (event: any) => {
    const target = event.target;
    const finalX = target.getAttribute("data-x");
    const finalY = target.getAttribute("data-y");
    // 사진 좌표 저장해서 append 하는 코드 짜기
  },
});

export default function StickerPage({
  setStage,
  content,
  pics,
  groups,
  personal,
}: Props) {
  const navigate = useNavigate();
  // const contentBoxRef = useRef<HTMLInputElement | null>(null);
  // const contentBoxRef = useRef(null);
  const myStickers = useSelector(
    (state: RootState) => state.member.memberData.sticker
  );
  const [sentiment, setSentiment] = useState<{
    negative: number;
    positive: number;
  }>({ negative: 0, positive: 0 });
  const { memberData } = useMember();
  const username = memberData.username;
  // const nickname = memberData.nickname;
  const sendData = async () => {
    Promise.all([
      postSentimentApi({ content: content }),
      postKeywordApi({ userId: username, content: content }),
    ]).then(([result, kewordSend]) => {
      setSentiment(result);
      const data = {
        text: content,
        fileList: pics,
        clubList: groups,
        isPersonal: personal,
        memberUsername: username,
        negativeRate: sentiment.negative,
        positiveRate: sentiment.positive,
      };
      postTodayDiaryApi(data);
      console.log(data, "this is data");
    });
  };

  return (
    <PageContainer>
      <StickerListTitle>보유중인 스티커</StickerListTitle>
      {/* <StickerListContainer></StickerListContainer> */}
      <div className="grid grid-cols-6">
        {myStickers?.map((sticker) => (
          <img
            src={sticker.sticker.imageUrl}
            className="sticker-item my-auto"
          />
        ))}
      </div>
      <ContentBox className="drop-container text-2xl font-hassam">
        {content}
      </ContentBox>
      <div className="flex justify-evenly">
        <button
          className="bg-gray-300 text-white w-[120px] h-[45px] rounded-md"
          onClick={() => setStage(0)}
        >
          이전
        </button>
        <button
          className="bg-bud-green text-white w-[120px] h-[45px] rounded-md"
          onClick={sendData}
        >
          완료
        </button>
      </div>
    </PageContainer>
  );
}
