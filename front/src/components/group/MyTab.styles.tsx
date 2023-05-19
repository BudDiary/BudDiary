import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.div`
  ${tw`h-[400px]`}
  animation-name: AppearText;
  animation-delay: 1s;
  animation-duration: 1.5s;
  animation-fill-mode: both;

  @keyframes AppearText {
    0% {
      ${tw`opacity-0`}
      transform: translateY(20px);
    }
    100% {
      ${tw`opacity-100`}
      transform: translateY(0px);
    }
  }
`;
