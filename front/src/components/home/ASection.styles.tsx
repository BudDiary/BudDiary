import styled from "styled-components";
import tw from "twin.macro";
import img from "./assets/Testimg.jpg";

interface running {
  run: string;
}

interface timer {
  time: string;
}

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
  ${tw`h-full flex flex-col mx-auto max-w-[1152px] justify-center items-center text-white sm:text-8xl xl:text-9xl`}
  font-size: 3rem;
  transform: translateY(-5%);
`;

export const FirstContent = styled.div<running>`
  animation-name: AslideIn;
  animation-delay: 0.3s;
  animation-duration: 1.5s;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

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

export const FirstDetail = styled.div<running>`
  ${tw`mr-6 text-bud-blue font-test xl:text-8xl`}
  animation-name: AfadeIn, AllBounce;
  animation-delay: 3s, 5s;
  animation-duration: 2s, 5s;
  animation-iteration-count: 1, infinite;
  animation-fill-mode: both, both;
  animation-play-state: ${(props) => props.run};

  @keyframes AfadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes AllBounce {
    0% {
      transform: translate(0px, 0px);
    }
    10% {
      transform: translate(0px, 0px);
    }
    18% {
      transform: translate(0px, -20%);
    }
    26% {
      transform: translate(0px, 0px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }
`;

export const BounceText = styled.span<timer>`
  display: inline-block;
  animation-name: ABounce;
  animation-delay: ${(props) => props.time};
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-play-state: running;

  @keyframes ABounce {
    0% {
      transform: translate(0px, 0px);
    }
    10% {
      transform: translate(0px, -30%);
    }
    20% {
      transform: translate(0px, 0px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }

  transition: all ease 0.2s;
  &:hover {
    ${tw`text-bud-green`}
    transition: all ease 0.2s;
  }
`;

export const EasterEgg = styled.span<timer>`
  ${tw`text-bud-green`}
  animation-name: ABounce;
  animation-delay: ${(props) => props.time};
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-play-state: running;

  display: inline-block;
  transform: rotate(0);
  transition: all ease 0.2s;

  &:hover {
    ${tw`text-bud-blue`}
    transform: rotate(90deg);
    transition: all ease 0.2s;
  }
`;

export const SeceondDetail = styled.div<running>`
  animation-name: AslideIn2;
  animation-delay: 1s;
  animation-duration: 1.5s;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

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

export const ThirdContent = styled.div<running>`
  animation-name: AslideIn3;
  animation-delay: 2s;
  animation-duration: 1.5s;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

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
  transform : translateX(-20px);
  width: 40px;
  height: 60px;
`;

export const MouseWheel = styled.div<running>`
  ${tw`absolute bottom-20 left-1/2 rounded-full bg-transparent border-solid border border-white`}
  transform : translateX(-5px);
  width: 10px;
  height: 10px;

  animation-name: WheelAnimation;
  animation-delay: 2s;
  animation-duration: 2s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  animation-play-state: ${(props) => props.run};

  @keyframes WheelAnimation {
    20% {
      opacity: 1;
      transform: translate(-5px, -35%);
    }
    100% {
      opacity: 0;
      transform: translate(-5px, 300%);
    }
  }
`;
