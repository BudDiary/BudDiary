import styled from "styled-components";
import tw from "twin.macro";
import cimg from "./assets/CCC.jpg";

interface timer {
  time: string;
  run: string;
}

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
  ${tw`mx-auto pl-0 max-w-[1152px] h-full flex flex-col justify-evenly items-center text-black sm:text-6xl sm:pl-12 md:text-7xl md:pl-8 lg:pl-4 xl:text-8xl`}
  font-size: 2.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  transform: translateY(-5%);

  @media screen and (max-width: 360px) {
    font-size: 2rem;
  }
`;

export const FirstSection = styled.div`
  ${tw``}
  width: 100%;
`;

export const AppearText = styled.span<timer>`
  ${tw``}
  animation-name: appearText;
  animation-delay: ${(props) => props.time};
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes appearText {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const SeceondSection = styled.div`
  ${tw``}
  width: 100%;
`;

export const ThirdSection = styled.div`
  ${tw`flex`}
  width: 100%;
`;

export const TypeText = styled.span`
  display: inline-block;
`;

export const ChangeBox = styled.div<timer>`
  ${tw`relative`}

  animation-name: changeBox;
  animation-duration: 8s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};
  @keyframes changeBox {
    0% {
      transform: translate(0px, 0px);
    }
    40% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: perspective(500px) rotateX(-90deg);
      opacity: 1;
    }
    51% {
      transform: perspective(500px) rotateX(-90deg);
      opacity: 0;
    }
    90% {
      transform: perspective(500px) rotateX(-270deg);
      opacity: 0;
    }
    90.1% {
      transform: perspective(500px) rotateX(-270deg);
      opacity: 1;
    }
    100% {
      transform: translate(0px, 0px);
    }
  }
`;

export const AfterChangeBox = styled.div<timer>`
  ${tw`absolute`}
  animation-name: changeBox2;
  animation-duration: 8s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};
  @keyframes changeBox2 {
    0% {
      transform: perspective(500px) rotateX(-270deg);
      opacity: 0;
    }
    45% {
      transform: perspective(500px) rotateX(-270deg);
      opacity: 1;
    }
    55% {
      transform: translate(0px, 0px);
      opacity: 1;
    }
    85% {
      transform: translate(0px, 0px);
      opacity: 1;
    }
    95% {
      transform: perspective(500px) rotateX(90deg);
      opacity: 1;
    }
    95.1% {
      transform: perspective(500px) rotateX(90deg);
      opacity: 0;
    }
    100% {
      transform: perspective(500px) rotateX(-270deg);
      opacity: 0;
    }
  }
`;

export const TextBox = styled.p<timer>`
  ${tw`text-left`}

  animation-name: ${(props) => props.run};
  /* animation-delay: 1.9s; */
  /* animation-duration: 6.02s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};
  @keyframes running {
    0% {
      transform: translate(10%, 0px);
    }
    10% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(0px, 0px);
    }
    60% {
      transform: translate(10%, 0px);
    }
    100% {
      transform: translate(10%, 0px);
    }
  } */
`;
