import React, { useRef, useState, useEffect } from "react";
import { getDiaryDetailApi } from "../../apis/diaryApi";
import {
  PageContainer,
  SubNavContainer,
} from "../../components/common/Page.styles";
import { StickerListTitle, ContentBox } from "../write/WritePage.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import { useNavigate } from "react-router-dom";
import { patchDiaryStickerApi } from "../../apis/diaryApi";
import interact from "interactjs";
import navimg from "../../assets/subnav/Decorate.jpg";

interface Props {
  stickerId: number;
  imgUrl: string;
  xcoordinate: number;
  ycoordinate: number;
}
type usedSticker = {
  stickerUrl: any;
  xCoordinate: number;
  yCoordinate: number;
};

export default function DecoratePage() {
  const navigate = useNavigate();
  const [diaryContent, setDiaryContent] = useState<string>();
  const [usedStickers, setUsedStickers] = useState<Props[]>([]);
  const myStickers = useSelector(
    (state: RootState) => state.member.memberData.sticker
  );
  const [sendStickerList, setSendStickerList] = useState<usedSticker[]>([]);
  // interact(".sticker-item").draggable({
  //   onstart: (event: any) => {
  //     const itemElement = event.target;
  //     const itemRect = itemElement.getBoundingClientRect();
  //     const initialX = itemRect.left;
  //     const initialY = itemRect.top;
  //     itemElement.setAttribute("data-initial-x", initialX);
  //     itemElement.setAttribute("data-initial-y", initialY);
  //   },
  //   onend: (event: any) => {
  //     const target = event.target;
  //     const startX = Number(target.getAttribute("data-initial-x"));
  //     const startY = Number(target.getAttribute("data-initial-y"));
  //     const movedX = Number(target.getAttribute("data-x"));
  //     const movedY = Number(target.getAttribute("data-y"));
  //     const finalX = startX + movedX;
  //     const finalY = startY + movedY;

  //     // 사진 좌표 저장해서 append 하는 코드 짜기

  //     const temp: usedSticker = {
  //       stickerUrl: target.src,
  //       xCoordinate: finalX,
  //       yCoordinate: finalY,
  //     };

  //     setSendStickerList([...sendStickerList, temp]);
  //   },
  // });
  // 드래그 시작될 때 실행
  const dragItem = useRef();
  const dragStart = (e: any, position: any) => {
    dragItem.current = position;
    e.target.classList.add("grabbing");
    console.log(dragItem.current, "드래그 시작할때");
  };
  // 드랍 (커서 뗐을 때)
  const drop = (e: any) => {
    e.target.classList.remove("grabbing");
    console.log(e, "????");
    console.log(e.screenX);
    console.log(e.screenY);
    const temp: usedSticker = {
      stickerUrl: e.target.src,
      xCoordinate: e.screenX,
      yCoordinate: e.screenY,
    };
    setSendStickerList([...sendStickerList, temp]);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const currentUrl = window.location.href;
        const diaryId = currentUrl.split(`/decorate/`)[1];
        const response = await getDiaryDetailApi(diaryId);
        setDiaryContent(response.simpleDiary.diaryInfo.text);
        setUsedStickers(response.usedStickers);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const sendData = () => {
    const finalData = {
      stickerDtoList: sendStickerList,
      diaryId: window.location.href.split(`/decorate/`)[1],
    };
    patchDiaryStickerApi(finalData);
    window.location.reload();
    // 여기에서 데이터 payload 만들고 api 호출
  };
  return (
    <div className="relative">
      <SubNavContainer img={navimg}></SubNavContainer>
      <PageContainer>
        {usedStickers.map((sticker, index) => (
          <img
            key={index}
            src={sticker.imgUrl}
            style={{
              left: sticker.xcoordinate,
              top: sticker.ycoordinate,
            }}
            className="absolute w-[192px]"
          />
        ))}
        {sendStickerList.map((sticker, index) => (
          <img
            key={index}
            src={sticker.stickerUrl}
            style={{
              left: sticker.xCoordinate,
              top: sticker.yCoordinate,
            }}
            className="absolute w-[192px]"
          />
        ))}
        <StickerListTitle>보유중인 스티커</StickerListTitle>
        <div className="grid grid-cols-6 h-[160px]">
          {myStickers?.map((sticker, idx) => (
            <img
              src={sticker.sticker.imageUrl}
              className="sticker-item my-auto hover:cursor-pointer"
              draggable
              onDragStart={(e) => dragStart(e, idx)}
              onDragEnd={drop}
            />
          ))}
        </div>
        <ContentBox className="drop-container text-2xl font-hassam">
          {diaryContent}
        </ContentBox>
        <div className="flex justify-evenly">
          <button
            className="bg-gray-300 text-white w-[120px] h-[45px] rounded-md"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
          <button
            className="bg-bud-green text-white w-[120px] h-[45px] rounded-md"
            onClick={sendData}
          >
            완료
          </button>
        </div>
      </PageContainer>
    </div>
  );
}
