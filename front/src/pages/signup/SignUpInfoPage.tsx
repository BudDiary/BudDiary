import React, { useState, useRef } from 'react'
import { PageContainer } from '../../components/common/Page.styles'
import { SurveyAgainButton, ResetButton } from '../../components/common/Button.styles'
import { SignupInfoInput, SignupPicInput } from '../../components/common/Input.styles'
import { SignUpInfoInputSection,ProfilePicContainer, FlexedContainer, ImgInput } from './SignUpInfoPage.styles'
import { firstSignUpApi } from '../../apis/userApi'

export default function SignUpInfoPage() {
  const [fileURL, setFileURL] = useState<string>("");
  const [file, setFile] = useState<FileList | null>();
  const imgUploadInput = useRef<HTMLInputElement | null>(null);
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

  // 저장하기 눌렀을 때
  const submitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    /** 서버통신 */
    const formData = new FormData();

    if (file) {
      formData.append("profilePic", file[0]);
      formData.append('nickname', nickname);
      try {
        // const response = await axios.post("/api/upload", formData, {
        //   headers: { "content-type": "multipart/form-data" },
        // });
        firstSignUpApi(formData)
        console.log('야호')
      } catch (error: any) {
        console.log("이미지업로드 에러 발생");
        throw new Error(error);
      }
    } else {
      alert("업로드할 이미지가 없습니다");
    }
  };
  return (
    <PageContainer>
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
