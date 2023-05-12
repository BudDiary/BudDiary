import React, { useState, useRef, useEffect } from "react";
import { PageContainer } from "../../components/common/Page.styles";
import {
  SurveyAgainButton,
  ResetButton,
} from "../../components/common/Button.styles";
import {
  SignupInfoInput,
  SignupPicInput,
} from "../../components/common/Input.styles";
import {
  SignUpInfoInputSection,
  ProfilePicContainer,
  FlexedContainer,
  ImgInput,
} from "./SignUpInfoPage.styles";
import { deleteTokenApi, firstSignUpApi } from "../../apis/userApi";
import useMember from "../../hooks/memberHook";
import { useLocation } from "react-router-dom";
import ModalWindow from "../../components/common/ModalWindow";
import { KAKAO_AUTH_URL } from "../../apis/axiosConfig";
import { Button } from "@mui/base";
import Swal from "sweetalert2";

export default function SignUpInfoPage() {
  const [fileURL, setFileURL] = useState<string>("");
  const [file, setFile] = useState<FileList | null>();
  const imgUploadInput = useRef<HTMLInputElement | null>(null);
  const [nickname, setNickname] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isSurveyDone, SetIsSurveyDone] = useState(false);
  // useEffect(() => {
  //   setCookie('hey', 'hi', { path: "/"})
  // }, []);
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

  // 설문으로 넘어가기 눌렀을 때
  const sendToSurvey = () => {
    setModalOpen(true);
    SetIsSurveyDone(true);
  };
  // 저장하기 눌렀을 때
  const submitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    /** 서버통신 */
    const formData = new FormData();
    if (nickname === "") {
      Swal.fire({
        icon: "error",
        text: "닉네임은 필수로 입력해야 합니다.",
      });
    } else {
      if (file) {
        formData.append("profilePic", file[0]);
      }
      formData.append("nickname", nickname);
      // console.log(formData,'this is form Data')
      // 폼 객체 key 와 value 값을 순회.
      const response = await firstSignUpApi(formData);
      let entries = formData.entries();
      for (const pair of entries) {
        console.log(pair[0] + ", " + pair[1]);
        // loginResponse.profilePic = pair[0]
        // loginResponse.nickname = pair[1]
      }
      if (response === true) {
        window.location.href = KAKAO_AUTH_URL;
        // 프로필과 닉네임 설정 완료 시 로그인 상태로 전환
        // console.log(loginResponse, 'this is loginResponse')
        // login(loginResponse)
        // setModalOpen(true)
      } else {
        console.log("실패여");
        // setModalOpen(true)
      }
    }
  };
  return (
    <PageContainer>
      {modalOpen && <ModalWindow page={3} setModalOpen={setModalOpen} />}
      <FlexedContainer>
        <SignUpInfoInputSection>
          <FlexedContainer>
            <ProfilePicContainer
              src={fileURL ? fileURL : "base_profile.jpg"}
            ></ProfilePicContainer>
          </FlexedContainer>
          <FlexedContainer className="mb-4">
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
            <ResetButton onClick={onImageRemove}>초기화</ResetButton>
          </FlexedContainer>
          <FlexedContainer>
            <SignupInfoInput
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
            ></SignupInfoInput>
          </FlexedContainer>
          <FlexedContainer className="mt-16">
            {isSurveyDone ? (
              <SurveyAgainButton onClick={submitHandler}>
                저장하기
              </SurveyAgainButton>
            ) : (
              <SurveyAgainButton onClick={sendToSurvey}>
                설문하기
              </SurveyAgainButton>
            )}
          </FlexedContainer>
        </SignUpInfoInputSection>
      </FlexedContainer>
    </PageContainer>
  );
}
