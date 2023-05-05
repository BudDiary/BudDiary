import React from "react";
import {BiArrowBack} from 'react-icons/bi'
import { ModalContainer, BackgroundContainer, ModalTopNavContainer, CloseModalButton, ModalTitle, SaveModalButton } from '../common/Modal.styles'
import { SurveyAgainButton } from "../common/Button.styles";

interface Props {
    setNewDiaryModal: React.Dispatch<React.SetStateAction<boolean>>;
  }

  export default function NewGroupDiaryModal({ setNewDiaryModal }: Props) {
    const closeDiaryModal = () => {
        setNewDiaryModal(false);  }
  return (
    <>
      <BackgroundContainer>gg</BackgroundContainer>
      <ModalContainer>
        <ModalTopNavContainer>
          <CloseModalButton><BiArrowBack /></CloseModalButton>
          <ModalTitle>프로필 수정</ModalTitle>
          <SaveModalButton  onClick={closeDiaryModal}>완료</SaveModalButton>
        </ModalTopNavContainer>
        {/* <div className="w-[200px] h-[200px]"></div> */}
        <input type="file"></input>
        <input type="text" placeholder="닉네임"></input>
        <input type="text" placeholder="소개글"></input>
      </ModalContainer>
    </>
  )
}
