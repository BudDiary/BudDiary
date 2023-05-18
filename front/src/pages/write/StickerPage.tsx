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
import { postLiveNewDiaryApi } from "../../apis/noticeApi";

interface Props {
  setStage: React.Dispatch<React.SetStateAction<number>>;
  content: string;
  pics: any;
  groups: any;
  personal: boolean;
}

type usedSticker = {
  stickerUrl: any;
  xCoordinate: number;
  yCoordinate: number;
};

export default function StickerPage({
  setStage,
  content,
  pics,
  groups,
  personal,
}: Props) {
  const navigate = useNavigate();
  // 보낼 스티커 리스트 담는 useState
  const [sendStickerList, setSendStickerList] = useState<usedSticker[]>([]);
  // 드래그 후 sendSticker
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
      // 사진 좌표 저장해서 append
      const temp: usedSticker = {
        stickerUrl: target.src,
        xCoordinate: finalX,
        yCoordinate: finalY,
      };
      setSendStickerList([...sendStickerList, temp]);
    },
  });
  // 내 아이디
  const { memberData } = useMember();
  const username = memberData.username;
  // 내가 소유한 스티커들. 리덕스에서 가져옴
  const myStickers = useSelector(
    (state: RootState) => state.member.memberData.sticker
  );
  // 내 감정들
  const [sentiment, setSentiment] = useState<{
    negative: number;
    positive: number;
  }>({ negative: 0, positive: 0 });
  // 보낼 데이터
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
    // fastapi에 보낼 데이터 저장
    setData((prevData) => ({
      ...prevData,
      negativeRate: sentiment.negative,
      positiveRate: sentiment.positive,
    }));
  }, [sentiment]);

  // 데이터 보내기
  const sendData = async () => {
    // 데이터 fastapi로 보내기
    await Promise.all([
      postSentimentApi({ content: content }),
      postKeywordApi({ userId: username, content: content }),
    ])
      .then(async ([result]) => {
        await setSentiment(result);
        // -------------------------------------------------------------------------------------------------------------
        // 여기만 수정하면된다;;;;;;
        // const formData = new FormData();
        let stickerData: usedSticker[] = [];
        if (sendStickerList.length > 0) {
          stickerData = [...sendStickerList];
          console.log(stickerData, "this is stickerData");
        }
        let resultArray: string[] = [];
        stickerData.forEach((element, index) => {
          const value1 = `stickerDtoList[${index}].stickerUrl: ${element.stickerUrl}`;
          resultArray.push(value1);
          const value2 = `stickerDtoList[${index}].xCoordinate: ${element.xCoordinate}`;
          resultArray.push(value2);
          const value3 = `stickerDtoList[${index}].yCoordinate: ${element.xCoordinate}`;
          resultArray.push(value3);
        });
        const updatedData = {
          ...data,
          negativeRate: result.negative,
          positiveRate: result.positive,
          stickerDtoList: stickerData,
        };
        // ---------------------------------------------------------------------------------------------------------------------
        return updatedData;
      })
      .then((updatedData) => {
        console.log(updatedData, "진짜 보낼데이터터");
        // 스프링으로 데이터 보내기
        postTodayDiaryApi(updatedData)
          .then(() => {
            if (updatedData.clubList.length === 0) {
              navigate("/mypage");
            } else {
              // 일기 작성이 잘 되었다면
              // 구성원 모두한테 알람 보내기
              postLiveNewDiaryApi(updatedData.clubList);
              navigate("/group");
            }
          })
          .catch((error) => {
            console.log("Error:", error);
          });
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