import styled from "styled-components";
import tw from "twin.macro";

export const GroupList = styled.div`
  ${tw`flex flex-col items-center justify-center gap-2`}
  width: 90%;
  height: 400px;
  padding: 20px;
  border: 2px solid #bee5bf;
  border-radius: 8px;

  img {
    ${tw`rounded-lg border border-4 border-none`};
    height: 150px;
    width: 95%;
  }

  p {
    ${tw`font-berry `}
  }

  div {
    ${tw`flex items-center justify-start gap-6`}
    width: 100%;
  }
`;

export const MemberList = styled.div`
  overflow-y: auto;
  max-height: 300px;
  ${tw`flex flex-col`}
  ::-webkit-scrollbar {
    display: none;
  }
  div {
    ${tw`flex items-center justify-start gap-6 font-berry`}

    img {
      ${tw`rounded-full border-2 border-bud-blue`}
      height: 35px;
      width: 35px;
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
  ${tw`flex items-end`}

  img {
    margin-right: 5px; // 오른쪽에 5px 간격 추가
  }

  p {
    margin-left: 5px; // 왼쪽에 5px 간격 추가
  }
`;
