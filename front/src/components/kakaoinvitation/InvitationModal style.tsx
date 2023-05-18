import styled from "styled-components";
import tw from "twin.macro";

export const DescriptionBox = styled.textarea`
  ${tw`bg-blue-200 text-sm leading-normal font-hassam h-[40%] w-[100%] border-2 border-bud-black p-4`}
  resize: none;
  ::-webkit-scrollbar {
    display: none;
  }
  vertical-align: middle;
  @media (max-width: 640px) {
    ${tw`bg-blue-200 text-gray-700 border border-gray-300 rounded-lg py-2 px-3 mr-2 block appearance-none leading-normal font-hassam`}
    width: 70%;
  }
`;

export const SendInvitation = styled.div`
  ${tw`flex px-6 items-center`}
  height: 100%;

  @media (max-width: 640px) {
    ${tw`flex flex-col`}
  }
`;
export const LeftInvitation = styled.div`
  ${tw`w-1/2 flex justify-center items-center `}
  @media (max-width: 640px) {
    ${tw`w-[100%] mt-10`}
    min-height: 150px;
  }
  p {
    ${tw`py-1 mt-[5%]`}
    font-size: 5px;
  }
`;
export const InvitationExample = styled.div`
  ${tw`h-[100%] border-2 border-bud-blue p-2 my-6 mx-4`}
  border-radius : 10px;
  height: 300px;

  @media (max-width: 640px) {
    ${tw` h-[100%]`}
    min-height: 200px;
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
  ${tw`w-1/2`}
  h2 {
    ${tw`font-berry mt-3`}
  }
  h4 {
    ${tw`font-berry text-sm my-2`}
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
  ${tw`bg-gray-200 text-bud-black py-2 px-2 `}
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
