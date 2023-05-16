import styled from "styled-components";
import tw from "twin.macro";

export const GroupList = styled.div`
  ${tw`flex flex-col items-center justify-center gap-2`}
  width: 90%;
  height: 400px;
  padding: 20px;
  border: 5px solid #bee5bf;
  border-radius: 15px;

  img {
    ${tw`rounded-lg border border-4 border-bud-green`};
    height: 150px;
    width: 95%;
  }

  p {
    ${tw`font-berry mb-4`}
  }

  div {
    ${tw`flex items-center justify-start gap-6`}
    width: 100%;
  }
`;

export const MemberList = styled.div`
  overflow-y: auto;
  max-height: 300px;
  ${tw`flex flex-col gap-2`}
  ::-webkit-scrollbar {
    display: none;
  }
  div {
    ${tw`flex items-center justify-start gap-6 font-berry`}

    img {
      height: 35px;
      width: 35px;
      border: 1px solid black;
      ${tw`rounded-full`}
    }

    p {
      ${tw`text-bud-blue text-center items-center`}
    }
  }
`;

export const ClubList = styled.span`
  ${tw`font-berry mx-2 px-1`}
`;

export const MemberListInfo = styled.span`
  ${tw`flex items-center`}
`;
