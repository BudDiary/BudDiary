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
  ${tw`bg-white h-[75%] w-[320px] sm:w-[50%] rounded-xl border-2 p-10`}
`;
