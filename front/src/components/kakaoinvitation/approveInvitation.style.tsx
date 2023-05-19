import styled, { keyframes } from "styled-components";
import tw from "twin.macro";

export const JoinContainer = styled.div`
  ${tw`flex justify-center items-center text-center`}
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

export const WelcomeContainer = styled.div`
  ${tw``}

  img {
    ${tw`m-auto border-4 border-bud-blue`}
    width: 30vw;
    height: 40vh;
    border-radius: 0 15px 0 15px;
  }
  @media (max-width: 640px) {
    ${tw``}
    img {
      ${tw`m-auto border-4 border-bud-blue`}
      width: 80vw;
      height: 40vh;
      border-radius: 0 15px 0 15px;
    }
  }
`;

export const JoinNotice = styled.div`
  ${tw``}
  font-size: 4vw;
  font-weight: bold;
  letter-spacing: 0.2em;
`;

export const JoinText = styled.span<{ delay: number }>`
  ${tw`text-bud-blue font-berry my-4`}
  position: relative;
  animation: ${TextUpAnimation} 1.8s infinite;
  animation-delay: ${(props) => props.delay}s;
`;
export const JoinGreenText = styled.span<{ delay: number }>`
  ${tw`text-bud-green my-4 font-bold`}
  position: relative;
  animation: ${TextUpAnimation} 1.8s infinite;
  animation-delay: ${(props) => props.delay}s;
`;

export const WelcomeText = styled.div`
  ${tw`font-berry my-2`}
  font-size : 0.8rem
  @media (max-width: 640px) {
`;
export const WarningText = styled.div`
  ${tw`font-berry my-2 flex justify-center`}
  font-size : 1.2rem
`;

export const VisitButton = styled.button`
  ${tw`font-berry my-2 py-2 px-3 bg-bud-blue text-bud-black`}
  border-radius: 15px
`;
