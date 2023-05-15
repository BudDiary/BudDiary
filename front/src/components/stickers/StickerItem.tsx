import React, { useState } from "react";
import {
  StickerImageBox,
  StickerPriceBox,
  IndividualStickerContainer,
} from "./StickerItem.styles";
import StickerBuyModal from "./StickerBuyModal";

interface Props {
  stickerId: number;
  imageUrl: string | undefined;
  name: string;
  price: number;
}

export default function StickerItem(props: Props) {
  const { stickerId, imageUrl, name, price } = props;
  const [modalState, handleModalState] = useState(false);
  const openStickerModal = async () => {
    handleModalState(true);
  };

  return (
    <>
      {modalState ? (
        <StickerBuyModal
          key={stickerId}
          stickerId={stickerId}
          imageUrl={imageUrl}
          price={price}
        />
      ) : null}
      <IndividualStickerContainer onClick={openStickerModal}>
        <StickerImageBox src={imageUrl} alt={name} />
        <StickerPriceBox>{price}포인트</StickerPriceBox>
      </IndividualStickerContainer>
    </>
  );
}
