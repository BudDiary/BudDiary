import styled from "styled-components";
import tw from "twin.macro";
import cimg from "./assets/CSectionimg.jpg";

export const SectionContainer = styled.div`
  ${tw`relative bg-contain`}
  height: 100vh;
  width: 100vw;
  scroll-snap-align: start;
`;

export const ImageContainer = styled.div`
  ${tw`bg-cover bg-no-repeat absolute overflow-hidden bg-center`}
  width: 110vw;
  height: 105vh;
  background-image: url(${cimg});

  animation-name: CslideImage;
  animation-duration: 15s;
  animation-direction: alternate-reverse;
  animation-iteration-count: infinite;
  @keyframes CslideImage {
    0% {
      background-image: url(${cimg});
      transform: translate(0px, 0px);
    }
    100% {
      transform: translate(-10vw, -5vh);
    }
  }
`;

export const TextContainer = styled.div`
  ${tw`h-full flex flex-col justify-evenly items-center text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl`}
  font-size: 2rem;
  transform: translateY(-5%);

  animation-name: CslideIn;
  animation-duration: 5.5s;
  animation-fill-mode: both;

  @keyframes CslideIn {
    0% {
      ${tw`justify-start`}
    }
    100% {
      ${tw`justify-evenly`}
    }
  }
`;

export const FirstSection = styled.div`
  ${tw``}
  width: 70%;
`;

export const SeceondSection = styled.div`
  ${tw``}
  width: 70%;
`;

export const ThirdSection = styled.div`
  ${tw`flex`}
  width: 70%;
`;

export const ChangeBox = styled.div`
  ${tw``}
`;

export const TextBox = styled.div`
  ${tw``}
`;
