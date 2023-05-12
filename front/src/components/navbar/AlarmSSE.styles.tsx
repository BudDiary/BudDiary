import styled from "styled-components";
import tw from "twin.macro";

export const AlarmModalContainer = styled.div`
  position: fixed;
  top: 42px;
  right: 0%;
  z-index: 15;
  ${tw`bg-white h-[75%] w-[320px] border-2 rounded-xl`}
`;