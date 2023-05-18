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
  BuyButtonContainer,
  BuyButton,
  TotalPriceSection,
} from "./StickerBuyModal.styles";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  postBuyDiaryStickerApi,
  getMyStickersApi,
} from "../../apis/stickerApi";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import { getStickerList, updatePointsAction } from "../../store/modules/member";
import Swal from "sweetalert2";

interface StickerProps {
  stickerId: number;
  imageUrl: string | undefined;
  price: number;
  closeModal: any;
}

export default function StickerBuyModal({
  stickerId,
  imageUrl,
  price,
  closeModal,
}: StickerProps) {
  // const { stickerId, imageUrl, price } = props;
  const dispatch = useDispatch();
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const closeStickerModal = () => {
    closeModal();
  };
  const buySticker = async () => {
    const response = await postBuyDiaryStickerApi(stickerId, totalNumber);
    if (response.status === 200) {
      const leftPoint = response.data.leftPoint;
      dispatch(updatePointsAction(leftPoint));
      const sticker = await getMyStickersApi();
      dispatch(getStickerList(sticker));
      Swal.fire({
        icon: "success",
        text: "스티커를 구매했어요!🎉",
      });
      closeModal();
    } else {
      Swal.fire({
        icon: "error",
        title: "잔여 포인트가 부족해요😥",
        text: "다양한 활동으로 포인트를 획득해보세요.",
      });
    }
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
          <CloseModalButton onClick={closeStickerModal}>
            <BiArrowBack />
          </CloseModalButton>
          <ModalTitle>스티커 구매</ModalTitle>
          <SaveModalButton></SaveModalButton>
        </ModalTopNavContainer>
        <ModalContentSection>
          <StickerPictureContainer src={imageUrl}></StickerPictureContainer>
          <CalculateSection>
            {totalNumber >= 1 ? (
              <AiOutlineMinusSquare
                onClick={subtractTotalNumber}
                className="hover:cursor-pointer"
              />
            ) : (
              <AiOutlineMinusSquare className="text-gray-200" />
            )}

            {totalNumber}
            <AiOutlinePlusSquare
              onClick={addTotalNumber}
              className="hover:cursor-pointer"
            />
          </CalculateSection>
          <TotalPriceSection>{totalNumber * price}pts</TotalPriceSection>
        </ModalContentSection>
        <BuyButtonContainer>
          <BuyButton onClick={buySticker}>구매하기</BuyButton>
        </BuyButtonContainer>
      </ModalContainer>
    </>
  );
}
