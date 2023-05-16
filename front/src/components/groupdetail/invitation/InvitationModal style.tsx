import styled from "styled-components";
import tw from "twin.macro";

export const DescriptionBox = styled.textarea`
  ${tw`bg-blue-200 text-sm leading-normal font-hassam`}
  width: 80%;
  height: 100px;
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
  ${tw`flex px-6`}
`;
export const LeftInvitation = styled.div`
  ${tw`w-1/2`}
  p {
    ${tw`py-1`}
    font-size: 5px;
  }
`;
export const InvitationExample = styled.div`
  ${tw`h-[95%] border-2 border-bud-blue p-2 my-2 mx-6`}
  border-radius : 15px
`;

export const RightInvitation = styled.div`
  ${tw`w-1/2`}
  h2 {
    ${tw`font-berry mt-3`}
  }
  span {
    ${tw`flex items-center`}
    font-size: 5px;
  }
`;

export const JoinButton = styled.button`
  ${tw`bg-gray-200 text-bud-black py-1 px-2 font-black`}
  font-size: 3px;
  border-radius: 5px;
`;
export const CopyButton = styled.button`
  ${tw`bg-bud-blue text-bud-black px-2 text-center items-center ml-1 font-bold`}
  font-size: 3px;
  border-radius: 5px;
`;
