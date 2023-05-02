import styled from "styled-components";
import tw from "twin.macro";
import img from "./assets/Testimg.jpg";

export const SectionContainer = styled.div`
  ${tw`relative bg-contain`}
  height: calc(100vh - 42px);
  width: 100vw;
  scroll-snap-align: start;
  cursor: default;
`;

export const ImageContainer = styled.div`
  ${tw`bg-cover bg-no-repeat absolute overflow-hidden bg-center`}
  width: 110vw;
  height: 105vh;
  background-image: url(${img});

  animation-name: AslideImage;
  animation-duration: 15s;
  animation-direction: alternate-reverse;
  animation-iteration-count: infinite;
  @keyframes AslideImage {
    0% {
      background-image: url(${img});
      transform: translate(0px, 0px);
    }
    100% {
      transform: translate(-10vw, -5vh);
    }
  }
`;

export const TextContainer = styled.div`
  ${tw`h-full flex flex-col justify-center items-center text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl`}
  font-size: 2rem;
  transform: translateY(-5%);
`;

export const FirstContent = styled.div`
  animation-name: AslideIn;
  animation-delay: 0.3s;
  animation-duration: 1.5s;
  animation-fill-mode: both;

  @keyframes AslideIn {
    0% {
      opacity: 0;
      transform: translate(-45%, -20%);
    }
    100% {
      opacity: 1;
      transform: translate(-30%, -20%);
    }
  }
`;

export const SeceondContent = styled.div`
  ${tw`flex`}
`;

export const FirstDetail = styled.div`
  ${tw`mr-6 text-bud-blue`}
  animation-name: AfadeIn, ABounce;
  animation-delay: 3s, 4s;
  animation-duration: 2s, 4s;
  animation-iteration-count: 1, infinite;
  animation-fill-mode: both;

  @keyframes AfadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes ABounce {
    10% {
      transform: translateY(-6%);
    }
    40% {
      transform: translateY(0%);
    }
    75% {
      transform: translateY(-3%);
    }
    100% {
      transform: translateY(0%);
    }
  }
`;
export const EasterEgg = styled.span`
  ${tw`text-bud-green`}
  display: inline-block;
  &:hover {
    transform: rotate(90deg);
    transition: all ease 0.2s;
  }
  &:not(:hover) {
    transform: rotate(0);
    transition: all ease 0.2s;
  }
`;

export const SeceondDetail = styled.div`
  animation-name: AslideIn2;
  animation-delay: 1s;
  animation-duration: 1.5s;
  animation-fill-mode: both;

  @keyframes AslideIn2 {
    0% {
      opacity: 0;
      transform: translateX(-30%);
    }
    100% {
      opacity: 1;
    }
  }
`;

export const ThirdContent = styled.div`
  animation-name: AslideIn3;
  animation-delay: 2s;
  animation-duration: 1.5s;
  animation-fill-mode: both;

  @keyframes AslideIn3 {
    0% {
      opacity: 0;
      transform: translate(10%, 25%);
    }
    100% {
      opacity: 1;
      transform: translate(25%, 25%);
    }
  }
`;

// 휠 애니메이션

export const MouseHelper = styled.div`
  ${tw`absolute bottom-12 left-1/2 rounded-full bg-transparent border-solid border border-white`}
  transform : translateX(-25px);
  width: 50px;
  height: 90px;
`;

export const MouseWheel = styled.div`
  ${tw`absolute bottom-28 left-1/2 rounded-full bg-transparent border-solid border border-white`}
  transform : translateX(-5px);
  width: 10px;
  height: 10px;

  animation-name: WheelAnimation;
  animation-delay: 2s;
  animation-duration: 2s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;

  @keyframes WheelAnimation {
    0% {
      opacity: 1;
      transform: translateY(-10%);
    }
    100% {
      opacity: 0;
      transform: translateY(400%);
    }
  }
`;
// @media screen and (min-width: 640px) {
// width: 100px;
// height: 150px;
// }
