import styled from "styled-components";
import tw from "twin.macro";

interface randomImage {
  image: string;
  run: string;
}

interface ranImg {
  image: string;
}

interface timer {
  time: string;
  run: string;
}

interface animationrun {
  run: string;
}

export const SectionContainer = styled.div<randomImage>`
  ${tw`relative bg-cover`}
  background-image: url(${(props) => props.image});
  height: 100vh;
  scroll-snap-align: start;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(50px);
  }
`;

export const ImageContainer = styled.div<ranImg>`
  background-image: url(${(props) => props.image});
  ${tw`bg-cover bg-no-repeat bg-center rounded-md border sm:mr-4`}
  z-index: 1;
  width: 30%;
  height: 80%;
  min-height: calc(220px + 40%);

  @media screen and (max-width: 640px) {
    display: none;
  }
`;

export const ContentSection = styled.div`
  ${tw`max-w-[1152px] flex mx-auto h-full items-center text-white sm:text-7xl sm:pl-12 md:pl-8 lg:pl-4 lg:text-8xl`}
  font-size: 3.7rem;
`;

export const TextContainer = styled.div`
  ${tw`flex flex-col justify-between`}
  width: 70%;
  height: 80%;

  @media screen and (max-width: 640px) {
    ${tw`items-center`}
    width: 100%;
  }
  @media screen and (max-width: 360px) {
    font-size: 3rem;
  }
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

export const LazyAppearText = styled.div<timer>`
  ${tw`relative`}
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

export const WhiteBox = styled.p<animationrun>`
  ${tw`absolute h-full`}

  animation-name: hide;
  animation-delay: 6.2s;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-play-state: running;
  animation-timing-function: ease-in;
  animation-play-state: ${(props) => props.run};

  @keyframes hide {
    0% {
      width: 0%;
      background-color: white;
    }
    50% {
      width: 110%;
      margin-left: 0%;
      background-color: white;
    }
    100% {
      margin-left: 110%;
      width: 0%;
      background-color: white;
    }
  }
`;

export const FirstSection = styled.div``;

export const FirstBox = styled.div`
  ${tw`flex`}
`;

export const SeceondSection = styled.div``;

export const ThirdSection = styled.div``;

export const ButtonSection = styled.div`
  ${tw`border mx-auto relative border-bud-green`}
  z-index:1;
  width: 50%;
  height: 10%;
  min-height: 50px;
`;

export const ButtonTextBox = styled.div<animationrun>`
  ${tw`absolute flex items-center justify-center bg-transparent`}
  width: 80%;
  height: 100%;

  @media screen and (max-width: 640px) {
    font-size: 16rem;
  }

  animation-name: fillbox1;
  animation-duration: 0.6s;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes fillbox1 {
    0% {
      width: 0%;
      ${tw`bg-bud-yellow`}
    }
    100% {
      width: 80%;
      height: 100%;
      ${tw`bg-bud-yellow`}
    }
  }
`;

export const ButtonSubBox = styled.div<animationrun>`
  ${tw`absolute bg-transparent`}
  width: 80%;
  height: 100%;

  animation-name: fillbox2;
  animation-delay: 0.3s;
  animation-duration: 0.6s;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes fillbox2 {
    0% {
      width: 0%;
      ${tw`bg-bud-pink`}
    }
    100% {
      width: 80%;
      height: 100%;
      ${tw`bg-bud-pink`}
    }
  }
`;

export const ButtonSSubBox = styled.div<animationrun>`
  ${tw`absolute bg-transparent`}
  width: 80%;
  height: 100%;

  animation-name: fillbox3;
  animation-delay: 0.6s;
  animation-duration: 0.6s;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes fillbox3 {
    0% {
      width: 0%;
      ${tw`bg-bud-green`}
    }
    100% {
      width: 80%;
      height: 100%;
      ${tw`bg-bud-green`}
    }
  }
`;

export const ButtonText = styled.p`
  ${tw`absolute left-1/2 top-1/2 sm:text-3xl lg:text-5xl`}
  z-index: 2;
  width: 80%;
  transform: translate(-40%, -50%);
  font-size: 1.5rem;
  @media screen and (max-width: 360px) {
    font-size: 1rem;
  }
`;

export const ButtonArrowBox = styled.div`
  ${tw`absolute right-0 flex items-center justify-center bg-bud-green`}
  width:20%;
  height: 100%;
`;

export const ButtonArrow = styled.p`
  ${tw`relative`}
  font-size: 3rem;
  transform: translateY(5%);
  @media screen and (max-width: 360px) {
    font-size: 2rem;
  }
`;

export const SecondBox = styled.div<animationrun>`
  ${tw``}

  animation-name: lazyAppear;
  animation-delay: 4s;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes lazyAppear {
    0% {
      opacity: 0;
      transform: translateX(-10%);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }
`;
