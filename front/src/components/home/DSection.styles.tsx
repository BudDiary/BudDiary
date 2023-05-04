import styled from "styled-components";
import tw from "twin.macro";
import dimg from "./assets/DSectionimg916.jpg";

interface timer {
  time: string;
  run: string;
}

interface animationrun {
  run: string;
}

export const SectionContainer = styled.div`
  ${tw`relative bg-bud-blue `}
  height: 100vh;
  scroll-snap-align: start;
`;

export const ContentSection = styled.div`
  ${tw`max-w-[1152px] flex mx-auto h-full items-center text-white sm:text-5xl sm:pl-12 md:text-6xl md:pl-8 lg:pl-4 xl:text-7xl`}
  font-size: 2.5rem;
`;

export const TextContainer = styled.div`
  ${tw`flex flex-col justify-between `}
  width: 70%;
  height: 80%;
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
  animation-delay: 3.5s;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-play-state: running;
  animation-play-state: ${(props) => props.run};

  @keyframes hide {
    0% {
      width: 0%;
      background-color: white;
    }
    50% {
      width: 100%;
      margin-left: 0%;
      background-color: white;
    }
    100% {
      margin-left: 100%;
      width: 0%;
      background-color: white;
    }
  }
`;

export const FirstSection = styled.div``;

export const FirstBox = styled.div`
  ${tw`flex`}
`;

// export const SecondBox = styled.div``;

export const SeceondSection = styled.div``;

export const ThirdSection = styled.div``;

export const ImageContainer = styled.div`
  background-image: url(${dimg});
  ${tw`bg-cover bg-no-repeat bg-center rounded-md border`}
  width: 30%;
  height: 80%;
  min-height: calc(220px + 40%);
`;

export const ButtonSection = styled.div`
  ${tw`border mx-auto relative border-bud-green`}
  width: 50%;
  height: 10%;
`;

export const ButtonTextBox = styled.div<animationrun>`
  ${tw`absolute flex items-center justify-center bg-bud-yellow`}
  width:80%;
  height: 100%;
  &:hover {
    animation-name: fillbox1;
    animation-duration: 0.5s;
    animation-fill-mode: both;
    animation-play-state: ${(props) => props.run};
  }

  @keyframes fillbox1 {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`;

export const ButtonSubBox = styled.div`
  ${tw`absolute bg-bud-green`}
  width:80%;
  height: 100%;

  animation-name: fillbox2;
  animation-delay: 0.2s;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-play-state: running;

  @keyframes fillbox2 {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`;

export const ButtonText = styled.p`
  ${tw`z-10 absolute left-1/2 top-1/2`}
  width: 80%;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;
`;

export const ButtonArrowBox = styled.div`
  ${tw`absolute right-0 flex items-center justify-center bg-bud-green`}
  width:20%;
  height: 100%;
`;

export const ButtonArrow = styled.div`
  ${tw``}
  font-size: 3rem;
  height: 80%;
`;

export const SecondBox = styled.div<animationrun>`
  ${tw``}

  animation-name: lazyAppear;
  animation-delay: 2s;
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
