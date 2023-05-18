import styled from "styled-components";
import tw from "twin.macro";

// 회색배경
export const BackgroundContainer = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 10;
  ${tw`bg-black opacity-20 h-screen w-[100%]`}
`;
// 모달창 그 잡채
export const ModalContainer = styled.div`
  position: fixed;
  top: 10%;
  left: 20%;
  z-index: 15;
  ${tw`bg-white h-[75%] w-[320px] sm:w-[60%] border-2`}
`;
// 모달창 위에있는 상단바
export const ModalTopNavContainer = styled.div`
  justify-content: center;
  ${tw`bg-bud-blue h-[42px] flex justify-between px-4`}
`;

// 모달창 나가기버튼
export const CloseModalButton = styled.button`
  ${tw`h-[42px] ml-4`}
`;

// 모달창 제목
export const ModalTitle = styled.button`
  ${tw``}
`;

// 모달창 제목
export const SaveModalButton = styled.button`
  ${tw`text-blue-800 mr-4`}
`;

// 댓글 & 대댓글 수정 & 삭제 모달

export const EditContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 15;
  ${tw`bg-white h-[55%] w-[320px] border-2`}

  @media screen and (max-width: 640px) {
    ${tw`bg-white h-[65%] w-[320px] sm:w-[60%] border-2`}
  }
`;

// 그룹 정보 모달

export const GroupModal = styled.div`
  ${tw`bg-white h-[65%] w-[320px] sm:w-[60%] border-4 border-bud-green `}
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 15;
  border-radius: 10px;
  p {
    ${tw`font-berry my-3`}
    text-align: center;
  }

  div {
    ${tw`px-2 my-1`}
  }
`;

// 초대하기 모달

export const InvitationContainer = styled.div`
  ${tw`bg-white h-[65%] w-[50%] flex flex-col border border-bud-blue`}
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// 상단바 디자인

export const ModalTopContent = styled.div`
  ${tw`flex justify-center items-center`}
`;
