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
  // pics: File[] | null;
  groups: any;
  personal: boolean;
}

type stickerDtoList = {
  id: any;
  xCoordinates: number;
  yCoordinates: number;
};

const points: stickerDtoList[] = [];

interact(".sticker-item").draggable({
  onstart: (event: any) => {
    const itemElement = event.target;
    const itemRect = itemElement.getBoundingClientRect();
    const initialX = itemRect.left;
    const initialY = itemRect.top;
    itemElement.setAttribute("data-initial-x", initialX);
    itemElement.setAttribute("data-initial-y", initialY);
  },
  onend: (event: any) => {
    const target = event.target;
    const startX = Number(target.getAttribute("data-initial-x"));
    const startY = Number(target.getAttribute("data-initial-y"));
    const movedX = Number(target.getAttribute("data-x"));
    const movedY = Number(target.getAttribute("data-y"));
    const finalX = startX + movedX;
    const finalY = startY + movedY;

    // 사진 좌표 저장해서 append 하는 코드 짜기

    const temp: stickerDtoList = {
      id: target.src,
      xCoordinates: finalX,
      yCoordinates: finalY,
    };
    points.push(temp);
    console.log(target);
    console.log(points);
  },
});
console.log(points);
export default function StickerPage({
  setStage,
  content,
  pics,
  groups,
  personal,
}: Props) {
  const navigate = useNavigate();
  const contentBoxRef = useRef<HTMLInputElement | null>(null);
  const myStickers = useSelector(
    (state: RootState) => state.member.memberData.sticker
  );

  const [sentiment, setSentiment] = useState<{
    negative: number;
    positive: number;
  }>({ negative: 0, positive: 0 });
  const { memberData } = useMember();
  const username = memberData.username;
  const [data, setData] = useState<{
    text: string;
    fileList: File[] | null;
    clubList: any;
    isPersonal: boolean;
    memberUsername: string;
    negativeRate: number;
    positiveRate: number;
    stickerDtoList: any;
  }>({
    text: content,
    fileList: pics,
    clubList: groups,
    isPersonal: personal,
    memberUsername: username,
    negativeRate: 0,
    positiveRate: 0,
    stickerDtoList: [],
  });

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      negativeRate: sentiment.negative,
      positiveRate: sentiment.positive,
    }));
    // console.log(data, 'this is emotion test')
  }, [sentiment]);
  // const nickname = memberData.nickname;
  const sendData = async () => {
    Promise.all([
      postSentimentApi({ content: content }),
      postKeywordApi({ userId: username, content: content }),
    ]).then(([result, kewordSend]) => {
      setSentiment(result);
      setSentiment((prevSentiment) => {
        setData((prevData) => ({
          ...prevData,
          negativeRate: prevSentiment.negative,
          positiveRate: prevSentiment.positive,
          stickerDtoList: { points },
        }));
        return prevSentiment;
      });
      postTodayDiaryApi(data)
      .then(() => {
        if (data.clubList.length === 0) {
          navigate("/mypage");
        } else {
          navigate("/group");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
      console.log(data, "this is data");
    });
  };

  return (
    <PageContainer>
      <StickerListTitle>보유중인 스티커</StickerListTitle>
      {/* <StickerListContainer></StickerListContainer> */}
      <div className="grid grid-cols-6">
        {myStickers &&
          myStickers.length > 0 &&
          myStickers.map((sticker) => (
            <img
              src={sticker.sticker.imageUrl}
              // alt={String(sticker.sticker.stickerId)}
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
