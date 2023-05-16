import React, { useRef, useState, useEffect } from "react";
import { ContentBox, StickerListTitle } from "./WritePage.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import navimg from "../../assets/subnav/WirteDiary.jpg";
import interact from "interactjs";
import { PageContainer } from "../../components/common/Page.styles";
// import { getMyStickersApi } from "../../apis/stickerApi";

interface Props {
  setStage: React.Dispatch<React.SetStateAction<number>>;
  content: string;
}

// interface StickerListProps {
//   captainUsername: string | null;
//   clubName: string;
//   clubUuid: string;
//   thumbnailUrl: string | undefined;
//   clubType: string;
// }

export default function StickerPage({ setStage, content }: Props) {
  const contentBoxRef = useRef<HTMLInputElement | null>(null);
  const myStickers = useSelector(
    (state: RootState) => state.member.memberData.sticker
  );

  interact(".item").draggable({
    onstart: (event: any) => {
      const contentBoxElement = contentBoxRef.current;
      const itemElement = event.target;

      if (contentBoxElement && itemElement) {
        const contentBoxRect = contentBoxElement.getBoundingClientRect();
        const itemRect = itemElement.getBoundingClientRect();

        const itemInsideContentBox =
          itemRect.left >= contentBoxRect.left &&
          itemRect.right <= contentBoxRect.right &&
          itemRect.top >= contentBoxRect.top &&
          itemRect.bottom <= contentBoxRect.bottom;

        itemElement.setAttribute(
          "data-was-inside",
          itemInsideContentBox ? "true" : "false"
        );
      }
    },
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
      const contentBoxElement = contentBoxRef.current;
      const itemElement = event.target;

      if (contentBoxElement && itemElement) {
        const contentBoxRect = contentBoxElement.getBoundingClientRect();
        const itemRect = itemElement.getBoundingClientRect();

        const itemInsideContentBox =
          itemRect.left >= contentBoxRect.left &&
          itemRect.right <= contentBoxRect.right &&
          itemRect.top >= contentBoxRect.top &&
          itemRect.bottom <= contentBoxRect.bottom;

        const wasInsideContentBox =
          itemElement.getAttribute("data-was-inside") === "true";

        if (!itemInsideContentBox) {
          const initialX =
            parseFloat(itemElement.getAttribute("data-initial-x")) || 0;
          const initialY =
            parseFloat(itemElement.getAttribute("data-initial-y")) || 0;
          itemElement.style.transform = `translate(${initialX}px, ${initialY}px)`;
          itemElement.setAttribute("data-x", initialX);
          itemElement.setAttribute("data-y", initialY);
          console.log(" -> 밖으로");
        } else {
          const newX = parseFloat(itemElement.getAttribute("data-x")) || 0;
          const newY = parseFloat(itemElement.getAttribute("data-y")) || 0;
          itemElement.setAttribute("data-initial-x", newX);
          itemElement.setAttribute("data-initial-y", newY);
          console.log(" -> 안으로", newX, newY - 192.5);
        }
      }
      // 스티커 가져오기
    },
  });
  return (
    <PageContainer>
      <StickerListTitle>보유중인 스티커</StickerListTitle>
      {/* <StickerListContainer></StickerListContainer> */}
      <div className="grid grid-cols-6">
        {myStickers?.map((sticker) => (
          <img src={sticker.sticker.imageUrl} className="item my-auto" />
        ))}
      </div>
      <ContentBox ref={contentBoxRef}>{content}</ContentBox>
      <div className="flex justify-evenly">
        <button
          className="bg-gray-300 text-white w-[120px] h-[45px] rounded-md"
          onClick={() => setStage(0)}
        >
          이전
        </button>
        <button className="bg-bud-green text-white w-[120px] h-[45px] rounded-md">
          완료
        </button>
      </div>
    </PageContainer>
  );
}
