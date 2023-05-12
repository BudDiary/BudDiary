import React , { useState,useRef }from "react";
import {BiArrowBack} from 'react-icons/bi'
import { ModalContainer, BackgroundContainer, ModalTopNavContainer, CloseModalButton, ModalTitle, SaveModalButton } from '../common/ModalWindow.styles'
import { SurveyAgainButton, ResetButton } from "../common/Button.styles";
import { SurveyLink, ProfilePicBox, ImgInput } from "./ProfileEditModal.styles";
import { SignupInfoInput, SignupPicInput } from "../common/Input.styles";
import { patchIntroApi, patchNicknameApi, patchProfileApi } from "../../apis/userApi";



interface Props {
  closeModal: any;
}

export default function ProfileEditModal({ closeModal }: Props) {
  const [fileURL, setFileURL] = useState<string>("");
  const [file, setFile] = useState<FileList | null>();
  const imgUploadInput = useRef<HTMLInputElement | null>(null);
  const [intro, setIntro] = useState('');
  const [nickname, setNickname] = useState('');
  // 기본이미지에서 내가 올린 이미지로 바꾸기
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files);
      const newFileURL = URL.createObjectURL(event.target.files[0]);
      setFileURL(newFileURL);
    }
  };
  // 초기화시키는거
  const onImageRemove = (): void => {
    URL.revokeObjectURL(fileURL);
    setFileURL(""); 
    setFile(null);
  };
  const closeProfileModal = () => {
    closeModal();
  }

  const updateIntro = () => {
    const data = JSON.stringify({
      'intro': intro
    })
    patchIntroApi(data)
  }
  const updateNickname = () => {
    const data = JSON.stringify({
      'nickname': nickname
    })
    patchIntroApi(data)
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
        <ProfilePicBox src={
            fileURL
            ? fileURL
            : "base_profile.jpg"
          }>
          </ProfilePicBox>
          <SignupPicInput>
        <label htmlFor="img">+ 프로필 사진 업로드</label>
        </SignupPicInput>
          <ImgInput
        type="file"
        id="img"
        accept="image/*"
        required
        ref={imgUploadInput}
        onChange={onImageChange}
      ></ImgInput>
      <ResetButton onClick={onImageRemove}>
        기본이미지
      </ResetButton>
      <SignupInfoInput type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)}></SignupInfoInput>
      <button onClick={updateNickname}>닉네임 수정</button>
      <SignupInfoInput type="text" placeholder="소개글" value={intro} onChange={(e) => setIntro(e.target.value)}></SignupInfoInput>
      <button onClick={updateIntro}>상메 수정</button>
      <SurveyAgainButton><SurveyLink to='/survey'>설문 다시하기</SurveyLink></SurveyAgainButton>
      </ModalContainer>
    </>
  )
}
