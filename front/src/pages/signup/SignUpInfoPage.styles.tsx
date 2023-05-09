import styled from "styled-components";
import tw from "twin.macro";


export const SignUpInfoInputSection = styled.div`
  ${tw`w-[360px] mt-10 border-2 border-gray-200 px-5 pt-16 pb-16 rounded-2xl drop-shadow-md`}
`;

export const ProfilePicContainer = styled.img`
  ${tw`w-[160px] h-[160px] border-2 border-gray-200 rounded-full mb-10`}
`;

export const FlexedContainer = styled.div`
  ${tw`flex justify-center`}
`;

// 회원가입 사진 인풋창
export const ImgInput = styled.input`
  display: none;
`;