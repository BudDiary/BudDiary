import styled, { keyframes } from "styled-components";
import tw from "twin.macro";

export const NotFoundContainer = styled.div`
  ${tw`flex flex-col justify-center items-center text-center rounded-md `}
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const NotFoundNotice = styled.div`
  ${tw`flex flex-row justify-center rounded-md mt-2 `}
  font-size: 11vw;
  font-weight: bold;
`;

export const NoticeContainer = styled.div`
  ${tw`flex flex-row justify-center rounded-md mt-2`}
`;

const TextUpAnimation = keyframes`
  0% {
    top: 0;
  }
  20% {
    top: -0.2rem;
  }
  40% {
    top: 0;
  }
  60% {
    top: 0;
  }
  80% {
    top: 0;
  }
  100% {
    top: 0;
  }
`;

export const ErrorNotice = styled.div`
  ${tw`font-berry`}
  font-size: 4vw;
  font-weight: bold;
`;
export const NoticeNav = styled.div`
  ${tw`flex flex-col font-berry my-5`}
  div {
    ${tw`my-4`}
  }
  p {
    ${tw` font-berry my-4`}
    font-size: 2vw;
  }
`;

export const ErrorText = styled.span<{ delay: number }>`
  ${tw`text-bud-blue font-berry my-4`}
  position: relative;
  animation: ${TextUpAnimation} 1.8s infinite;
  animation-delay: ${(props) => props.delay}s;
`;
export const NotText = styled.span<{ delay: number }>`
  ${tw`text-bud-green font-berry my-4`}
  position: relative;
  animation: ${TextUpAnimation} 1.8s infinite;
  animation-delay: ${(props) => props.delay}s;
`;

export const ButtonSet = styled.div`
  ${tw`flex flex-row`}
`;

export const NavButton = styled.button`
  ${tw`bg-bud-blue text-bud-black rounded-md px-3 py-2 font-bold m-2`}
  width: 30%;
  font-size: 1vw;
  &:hover {
    background-color: ${tw`bg-bud-pink text-bud-white`};
  }
`;
