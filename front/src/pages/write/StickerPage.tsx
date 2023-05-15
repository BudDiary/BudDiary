import React, { useRef } from "react";
import { ContentBox, StageContainer } from "./WritePage.styles";
import navimg from "../../assets/subnav/WirteDiary.jpg";
import interact from "interactjs";

interface Props {
  setStage: React.Dispatch<React.SetStateAction<number>>;
  content: string;
}

export default function StickerPage({ setStage, content }: Props) {
  const contentBoxRef = useRef<HTMLInputElement | null>(null);

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
    },
  });
  return (
    <StageContainer>
      <div className="text-4xl w-full text-center my-4">보유중인 스티커</div>
      <div className="flex ">
        <img src={navimg} alt="" className="item h-40 w-40 mr-8" />
        <img src={navimg} alt="" className="item h-40 w-40 mr-8" />
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
    </StageContainer>
  );
}
