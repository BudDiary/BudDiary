import React from "react";
import {BiArrowBack} from 'react-icons/bi'
import { ModalContainer, BackgroundContainer, ModalTopNavContainer, CloseModalButton, ModalTitle, SaveModalButton } from '../common/ModalWindow.styles'
import { SurveyAgainButton } from "../common/Button.styles";
import { SurveyLink } from "./ProfileEditModal.styles";


export default function ProfileEditModal() {
  const closeProfileModal = () => {
    // setProfileModalState(false);
  }
  return (
    <>
      <BackgroundContainer>gg</BackgroundContainer>
      <ModalContainer>
        <ModalTopNavContainer>
          <CloseModalButton onClick={closeProfileModal}><BiArrowBack /></CloseModalButton>
          <ModalTitle>프로필 수정</ModalTitle>
          <SaveModalButton>완료</SaveModalButton>
        </ModalTopNavContainer>
        {/* <div className="w-[200px] h-[200px]"></div> */}
        <input type="file"></input>
        <input type="text" placeholder="닉네임"></input>
        <input type="text" placeholder="소개글"></input>
        <SurveyAgainButton><SurveyLink to='/survey'>설문 다시하기</SurveyLink></SurveyAgainButton>
      </ModalContainer>
    </>
  )
}
