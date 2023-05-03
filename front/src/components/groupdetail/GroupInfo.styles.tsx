import styled from "styled-components";
import tw from "twin.macro";

export const GroupList = styled.div`
  ${tw`flex flex-col items-center justify-center gap-2`}
  width: 80%;
  height: 550px;
  padding: 20px;
  border: 5px solid pink;
  border-radius: 15px;

  img {
    border: 1px solid black;
    height: 200px;
    width: 95%;
    ${tw`rounded-lg`}
  }

  div {
    ${tw`flex items-center justify-start gap-8`}
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
    ${tw`flex items-center justify-start gap-6`}

    img {
      height: 50px;
      width: 50px;
      border: 1px solid black;
      ${tw`rounded-full`}
    }

    p {
      ${tw`text-base`}
    }
  }
`;
