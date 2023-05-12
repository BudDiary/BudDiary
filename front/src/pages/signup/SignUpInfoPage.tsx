import React, { useState, useRef, useEffect } from 'react'
import { PageContainer } from '../../components/common/Page.styles'
import { SurveyAgainButton, ResetButton } from '../../components/common/Button.styles'
import { SignupInfoInput, SignupPicInput } from '../../components/common/Input.styles'
import { SignUpInfoInputSection,ProfilePicContainer, FlexedContainer, ImgInput } from './SignUpInfoPage.styles'
import { firstSignUpApi } from '../../apis/userApi'
import useMember from '../../hooks/memberHook';
import { useLocation } from 'react-router-dom';
import ModalWindow from '../../components/common/ModalWindow'
export default function SignUpInfoPage() {
  const [fileURL, setFileURL] = useState<string>("");
  const [file, setFile] = useState<FileList | null>();
  const imgUploadInput = useRef<HTMLInputElement | null>(null);
  const [nickname, setNickname] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const { login } = useMember();
  const location = useLocation();
  const loginResponse = location.state;
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

  // 저장하기 눌렀을 때
  const submitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    /** 서버통신 */
    const formData = new FormData();

    if (file) {
      formData.append("profilePic", file[0]);
      formData.append('nickname', nickname);
      // 폼 객체 key 와 value 값을 순회.
      // let entries = formData.entries();
      // for (const pair of entries) {
      //     console.log(pair[0]+ ', ' + pair[1]); 
      // }
      const response = await firstSignUpApi(formData)
      if (response === true) {
        // 프로필과 닉네임 설정 완료 시 로그인 상태로 전환
        login(loginResponse)
        setModalOpen(true)
      } else {
        console.log('실패여')
        setModalOpen(true)
      }
    }
  };
  return (
    <PageContainer>
      {modalOpen && <ModalWindow page={3} setModalOpen={setModalOpen}/>}
      <FlexedContainer>
        <SignUpInfoInputSection>
        <FlexedContainer>
          <ProfilePicContainer src={
            fileURL
            ? fileURL
            : "base_profile.jpg"
          }>
          </ProfilePicContainer>
        </FlexedContainer>
        <FlexedContainer className='mb-4'>      
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
        초기화
      </ResetButton>
        </FlexedContainer>
        <FlexedContainer>
          <SignupInfoInput name="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder='닉네임을 입력하세요'></SignupInfoInput>
        </FlexedContainer>
        <FlexedContainer className='mt-16'>
          <SurveyAgainButton onClick={submitHandler}>저장하기</SurveyAgainButton>
        </FlexedContainer>
        </SignUpInfoInputSection>
      </FlexedContainer>
    </PageContainer>
  )
}
