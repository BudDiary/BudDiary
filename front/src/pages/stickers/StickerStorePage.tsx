import React, { useState, useEffect } from "react";
import { getAllStickersApi } from "../../apis/stickerApi";
import {
  PageContainer,
  SubNavContainer,
} from "../../components/common/Page.styles";
import StickerItem from "../../components/stickers/StickerItem";
import { StickersContainer } from "./StickerStorePage.styles";
import subnavimg from "../../assets/subnav/Stickers.jpg";
import useMember from "../../hooks/memberHook";

interface Stickers {
  stickerId: number;
  imageUrl: string | undefined;
  name: string;
  price: number;
}

export default function StickersPage() {
  const { memberData } = useMember();
  // const [points, setPoints] = useState<File | null>(null);
  const [allStickers, setAllStickers] = useState<Stickers[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllStickersApi();
        setAllStickers(data.stickerList);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <SubNavContainer img={subnavimg}>스티커 상점</SubNavContainer>
      <PageContainer>
        <div className="text-3xl font-berry mt-4">
          스티커 상점에 온 것을 환영합니다! 스티커를 구매 후, 내 일기 혹은 친구
          일기에 다꾸를 해보세요.
        </div>
        <div className="mt-4 text-2xl">
          내가 보유한 포인트: {memberData.points}
        </div>
        <StickersContainer>
          {allStickers.map((sticker) => (
            <StickerItem
              key={sticker.stickerId}
              stickerId={sticker.stickerId}
              imageUrl={sticker.imageUrl}
              name={sticker.name}
              price={sticker.price}
            />
          ))}
        </StickersContainer>
      </PageContainer>
    </>
  );
}
