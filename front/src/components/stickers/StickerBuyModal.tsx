import React, { useState } from "react";
import {
  BackgroundContainer,
  ModalContainer,
  ModalTopNavContainer,
  CloseModalButton,
  ModalTitle,
  SaveModalButton,
} from "../common/ModalWindow.styles";
import {
  ModalContentSection,
  StickerPictureContainer,
  CalculateSection,
  TotalPriceSection,
} from "./StickerBuyModal.styles";
import { BiArrowBack } from "react-icons/bi";
import { postBuyDiaryStickerApi } from "../../apis/stickerApi";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";

interface Props {
  stickerId: number;
  imageUrl: string | undefined;
  price: number;
}

export default function StickerBuyModal({ stickerId, imageUrl, price }: Props) {
  // const { stickerId, imageUrl, price } = props;
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const closeProfileModal = () => {
    // closeModal();
  };
  const buySticker = async () => {
    const response = await postBuyDiaryStickerApi(stickerId, totalNumber);
    console.log(response);
  };

  const subtractTotalNumber = () => {
    setTotalNumber(totalNumber - 1);
  };
  const addTotalNumber = () => {
    setTotalNumber(totalNumber + 1);
  };

  return (
    <>
      <BackgroundContainer></BackgroundContainer>
      <ModalContainer>
        <ModalTopNavContainer>
          <CloseModalButton onClick={closeProfileModal}>
            <BiArrowBack />
          </CloseModalButton>
          <ModalTitle>스티커 구매</ModalTitle>
          <SaveModalButton></SaveModalButton>
        </ModalTopNavContainer>
        <ModalContentSection>
          <StickerPictureContainer src={imageUrl}></StickerPictureContainer>
          <CalculateSection>
            <AiOutlineMinusSquare
              onClick={subtractTotalNumber}
              className="hover:cursor-pointer"
            />
            {totalNumber}
            <AiOutlinePlusSquare
              onClick={addTotalNumber}
              className="hover:cursor-pointer"
            />
          </CalculateSection>
          <TotalPriceSection>{totalNumber * price}pts</TotalPriceSection>
        </ModalContentSection>
        <button onClick={buySticker}>구매하기</button>
      </ModalContainer>
    </>
  );
}
