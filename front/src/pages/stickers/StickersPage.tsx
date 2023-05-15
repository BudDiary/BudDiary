import React, { useState, useEffect } from "react";
import { getAllStickersApi, getMyStickersApi } from "../../apis/stickerApi";
import {
  PageContainer,
  SubNavContainer,
} from "../../components/common/Page.styles";
import StickerItem from "../../components/stickers/StickerItem";
import { StickersContainer } from "./StickersPage.styles";
import subnavimg from "../../assets/subnav/Stickers.jpg";

interface Stickers {
  id: number;
  imageUrl: string | undefined;
  name: string;
  price: number;
}

export default function StickersPage() {
  const [allStickers, setAllStickers] = useState<Stickers[]>([]);
  const [myStickers, setMyStickers] = useState<Stickers[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllStickersApi();
        const mine = await getMyStickersApi();
        setAllStickers(data.stickerList);
        setMyStickers(mine.myStickerList);
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
        <div> 내가 보유한 포인트: {}</div>
        <StickersContainer>
          {allStickers.map((sticker) => (
            <StickerItem
              key={sticker.id}
              id={sticker.id}
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
