import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";



export const SurveyLink = styled(Link)`
    ${tw``}
`

export const ProfilePicBox = styled.img`
  ${tw`w-[160px] h-[160px] border-2 border-gray-200 rounded-full mb-10`}
`;


// 회원가입 사진 인풋창
export const ImgInput = styled.input`
  display: none;
`;