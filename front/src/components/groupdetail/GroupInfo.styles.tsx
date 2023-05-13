import styled from "styled-components";
import tw from "twin.macro";

export const GroupList = styled.div`
  ${tw`flex flex-col items-center justify-center gap-2`}
  width: 80%;
  height: 400px;
  padding: 20px;
  border: 5px solid #bee5bf;
  border-radius: 15px;

  img {
    border: 1px solid black;
    height: 150px;
    width: 95%;
    ${tw`rounded-lg`};
  }

  p {
    ${tw`font-berry`}
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
      ${tw`text-bud-blue`}
    }
  }
`;

export const ClubList = styled.span`
  ${tw`font-berry`}
`;
