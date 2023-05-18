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

export default function DecoratePage() {
  const navigate = useNavigate();
  const [diaryContent, setDiaryContent] = useState<string>();
  const myStickers = useSelector(
    (state: RootState) => state.member.memberData.sticker
  );
  useEffect(() => {
    async function fetchData() {
      try {
        const currentUrl = window.location.href;
        const diaryId = currentUrl.split(`/decorate/`)[1];
        const response = await getDiaryDetailApi(diaryId);
        setDiaryContent(response.simpleDiary.diaryInfo.text);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const sendData = () => {
    // patchDiaryStickerApi()
  };
  return (
    <>
      <SubNavContainer img={navimg}></SubNavContainer>
      <PageContainer>
        <StickerListTitle>보유중인 스티커</StickerListTitle>
        <div className="grid grid-cols-6">
          {myStickers?.map((sticker) => (
            <img
              src={sticker.sticker.imageUrl}
              className="sticker-item my-auto"
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
    </>
  );
}
