import React, { useState, useRef } from "react";
import { BiArrowBack } from "react-icons/bi";
import {
  ModalContainer,
  BackgroundContainer,
  ModalTopNavContainer,
  CloseModalButton,
  ModalTitle,
  SaveModalButton,
} from "../common/ModalWindow.styles";
import {
  SurveyAgainButton,
  ResetButton,
  EditSubmitButton,
} from "../common/Button.styles";
import {
  SurveyLink,
  ProfilePicBox,
  ImgInput,
  ProfileContainer,
  ModalContentContainer,
  ProfileEditButtonsContainer,
  EditInputContainer,
} from "./ProfileEditModal.styles";
import { SignupInfoInput, SignupPicInput } from "../common/Input.styles";
import {
  patchIntroApi,
  patchNicknameApi,
  patchProfileApi,
} from "../../apis/userApi";
import { useDispatch } from "react-redux";
import {
  updateIntroAction,
  updateNicknameAction,
  updateProfilePicAction,
} from "../../store/modules/member";
import useMember from "../../hooks/memberHook";

interface Props {
  closeModal: any;
}

export default function ProfileEditModal({ closeModal }: Props) {
  const { memberData } = useMember();
  const [fileURL, setFileURL] = useState<string>("");
  const [file, setFile] = useState<FileList | null>();
  const imgUploadInput = useRef<HTMLInputElement | null>(null);
  const [intro, setIntro] = useState("");
  const [nickname, setNickname] = useState("");
  const dispatch = useDispatch();
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
  };

  const updateIntro = async () => {
    const response = await patchIntroApi(intro);
    dispatch(updateIntroAction(response));
  };
  const updateNickname = async () => {
    const response = await patchNicknameApi(nickname);
    dispatch(updateNicknameAction(response));
  };
  const updateProfilePic = async () => {
    const formData = new FormData();
    if (file) {
      formData.append("inputFile", file[0]);
    }
    const response = await patchProfileApi(formData);
    dispatch(updateProfilePicAction(response));
  };
  return (
    <>
      <BackgroundContainer>gg</BackgroundContainer>
      <ModalContainer>
        <ModalTopNavContainer>
          <CloseModalButton onClick={closeProfileModal}>
            <BiArrowBack />
          </CloseModalButton>
          <ModalTitle>프로필 수정</ModalTitle>
          <SaveModalButton></SaveModalButton>
        </ModalTopNavContainer>
        {/* <div className="w-[200px] h-[200px]"></div> */}
        <ModalContentContainer>
          <ProfileContainer>
            <ProfilePicBox
              src={fileURL ? fileURL : "base_profile.jpg"}
            ></ProfilePicBox>
          </ProfileContainer>
          <ProfileEditButtonsContainer>
            <div>
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
              <ResetButton onClick={onImageRemove}>기본이미지</ResetButton>
            </div>
            <EditSubmitButton onClick={updateProfilePic}>
              프로필 사진 변경하기
            </EditSubmitButton>
          </ProfileEditButtonsContainer>
          <EditInputContainer>
            <SignupInfoInput
              type="text"
              placeholder={memberData.nickname}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            ></SignupInfoInput>
            <EditSubmitButton onClick={updateNickname}>
              닉네임 수정
            </EditSubmitButton>
          </EditInputContainer>
          <EditInputContainer>
            <SignupInfoInput
              type="text"
              placeholder="소개글"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
            ></SignupInfoInput>
            <EditSubmitButton onClick={updateIntro}>
              소개글 수정
            </EditSubmitButton>
          </EditInputContainer>
          <SurveyAgainButton>
            <SurveyLink to="/survey">설문 다시하기</SurveyLink>
          </SurveyAgainButton>
        </ModalContentContainer>
      </ModalContainer>
    </>
  );
}
