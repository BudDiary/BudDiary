import styled from "styled-components";
import tw from "twin.macro";

export const DescriptionBox = styled.textarea`
  ${tw`bg-blue-200 text-sm leading-normal font-hassam h-[120px] w-[100%] border-2 border-bud-black p-4`}
  resize: none;
  ::-webkit-scrollbar {
    display: none;
  }
  vertical-align: middle;
  @media (max-width: 768px) {
    ${tw`bg-blue-200 text-gray-700 border border-gray-300 rounded-lg py-2 px-3 mr-2 block appearance-none leading-normal font-hassam h-[100px]`}
    width: 100%;
  }
`;

export const SendInvitation = styled.div`
  ${tw`flex px-6 items-center m-auto`}
  height: 80%;

  @media (max-width: 640px) {
    ${tw`flex flex-col`}
  }
`;
export const LeftInvitation = styled.div`
  ${tw`w-1/2 flex justify-center items-center mr-2 `}
  @media (max-width: 640px) {
    ${tw``}
    max-height: 350px;
  }
  p {
    ${tw`py-1`}
    font-size: 5px;
  }
  @media (max-width: 640px) {
    ${tw`pt-8`}
  }
`;
export const InvitationExample = styled.div`
  ${tw`h-[100%] border-2 border-bud-blue py-3 px-2`}
  top: 50%;
  border-radius: 10px;
  max-height: 340px;

  @media (max-width: 640px) {
    ${tw` h-[100%]`}
    min-height: 360px;
    max-height: 360px;
    min-width: 300px;
    max-width: 300px;
  }
`;

export const DescriptionContent = styled.p`
  ${tw`text-gray-800`}
  overflow-y: auto;
  max-height: 75px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const RightInvitation = styled.div`
  ${tw`w-1/2  items-start text-start ml-2`}
  h2 {
    ${tw`font-berry mb-5`}
    font-size: 1.3rem
  }
  h4 {
    ${tw`font-berry text-sm my-3`}
    font-size: 0.8rem
  }
  span {
    ${tw`flex items-center`}
    font-size: 5px;
    p {
      ${tw`bg-bud-blue w-[82%] px-3 py-1`}
      overflow-x: auto;
      ::-webkit-scrollbar {
        display: none;
      }
    }
  }
  @media screen and (max-width: 640px) {
    ${tw`mt-6`}
  }
`;

export const JoinButton = styled.button`
  ${tw`bg-gray-200 text-bud-black py-1 px-2 `}
  width: 80%;
  font-weight: 600;
  font-size: 3px;
  border-radius: 5px;
`;
export const CopyButton = styled.button`
  ${tw`bg-bud-blue text-bud-black px-2 text-center items-center ml-2 font-bold text-white p-1`}
  font-size: 3px;
  border-radius: 5px;
`;

export const KakaoContainer = styled.div`
  ${tw`flex justify-center mt-4`}
`;
