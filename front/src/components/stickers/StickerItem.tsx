import React from "react";
import { StickerImageBox, StickerPriceBox } from "./StickerItem.styles";
import { postBuyDiaryStickerApi } from "../../apis/stickerApi";

interface Props {
  stickerId: number;
  imageUrl: string | undefined;
  name: string;
  price: number;
}

export default function StickerItem(props: Props) {
  const { stickerId, imageUrl, name, price } = props;
  const buySticker = async () => {
    const response = await postBuyDiaryStickerApi(stickerId, price);
    console.log(response);
  };

  return (
    <div onClick={buySticker}>
      <StickerImageBox src={imageUrl} alt={name} />
      <StickerPriceBox>{price}포인트</StickerPriceBox>
    </div>
  );
}
