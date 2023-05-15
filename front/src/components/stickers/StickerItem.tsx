import React from "react";

interface Props {
  id: number;
  imageUrl: string | undefined;
  name: string;
  price: number;
}

export default function StickerItem(props: Props) {
  const { id, imageUrl, name, price } = props;
  return (
    <div>
      <img src={imageUrl} alt={name} />
      <div>{name}</div>
      <div>{price}</div>
    </div>
  );
}
