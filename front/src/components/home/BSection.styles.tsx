import styled from "styled-components";
import tw from "twin.macro";

interface ImageSectionProps {
  Image: string;
  run: string;
}

interface running {
  run: string;
}

export const Container = styled.div`
  ${tw`flex flex-col sm:flex-none relative`}
`;

export const SectionContainer = styled.div`
  ${tw`relative bg-bud-yellow flex justify-center sm:items-center`}
  height: 100vh;
  scroll-snap-align: start;
  cursor: default;

  @media screen and (max-width: 640px) {
    padding-top: 10%;
  }
`;

export const ImageSection = styled.div<ImageSectionProps>`
  background-image: url(${(props) => props.Image});
  ${tw`bg-contain bg-no-repeat bg-top rounded-md`}
  width: 45%;
  height: 80%;
  min-height: calc(220px + 40%);

  @media screen and (max-width: 640px) {
    width: 50%;
    height: 30vh;
    min-height: 250px;
  }

  animation-name: BslideImg;
  animation-delay: 0.3s;
  animation-duration: 1.5s;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes BslideImg {
    0% {
      opacity: 0;
      transform: translateY(20%);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

export const TextContainer = styled.div`
  ${tw`h-full flex justify-center sm:flex sm:flex-col`}
`;

export const TextSection = styled.div`
  ${tw`text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl flex flex-col justify-around`}
  width: 100%;
  height: 40%;
  min-height: 200px;

  @media screen and (max-width: 640px) {
    transform: translateY(0px);
    font-size: 1.2rem;
    height: 30vh;
    width: 100%;
  }
`;

export const FirstDetail = styled.div<running>`
  ${tw``}
  animation-name: BslideIn;
  animation-delay: 0.3s;
  animation-duration: 1.5s;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes BslideIn {
    0% {
      opacity: 0;
      transform: translateY(-20%);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

export const SecondBox = styled.div``;

export const SecondDetail = styled.div<running>`
  ${tw`flex flex-col`}

  animation-name: BslideIn2;
  animation-delay: 0.9s;
  animation-duration: 1.5s;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes BslideIn2 {
    0% {
      opacity: 0;
      transform: translateX(-20%);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

export const ThirdDetail = styled.div<running>`
  ${tw``}

  animation-name: BslideIn3;
  animation-delay: 1.5s;
  animation-duration: 1.5s;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes BslideIn3 {
    0% {
      opacity: 0;
      transform: translateX(20%);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

export const WordSection = styled.div<running>`
  ${tw`text-2xl`}
  height: 40%;
  width: 100%;

  @media screen and (max-width: 640px) {
    display: none;
  }
`;

export const WordsSection = styled.div`
  ${tw`absolute text-center w-full z-20 text-4xl`}
  padding-top: min(320px);
  @media screen and (min-width: 640px) {
    display: none;
  }
`;

export const UnderLine = styled.div<running>`
  ${tw`bg-bud-blue`}
  height: 2px;
  width: 1rem;
  margin-left: min(1.7rem);

  @media screen and (max-width: 640px) {
    height: 2px;
    width: 2.2rem;
    margin-left: 1.7rem;
  }
  @media screen and (min-width: 641px) and (max-width: 768px) {
    height: 4px;
    width: 4.3rem;
    margin-left: 3rem;
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    height: 8px;
    width: 5.5rem;
    margin-left: 4.2rem;
  }
  @media screen and (min-width: 1025px) and (max-width: 1281px) {
    height: 12px;
    width: 7.2rem;
    margin-left: 5rem;
  }
  @media screen and (min-width: 1282px) {
    height: 12px;
    width: 8.2rem;
    margin-left: 6rem;
  }
  animation-name: BunderLine;
  animation-delay: 3s;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};
  @keyframes BunderLine {
    0% {
      width: 0%;
    }
    100% {
      @media screen and (max-width: 640px) {
        width: 2.2rem;
      }
      @media screen and (min-width: 641px) and (max-width: 768px) {
        width: 4.3rem;
      }
      @media screen and (min-width: 769px) and (max-width: 1024px) {
        width: 5.5rem;
      }
      @media screen and (min-width: 1025px) and (max-width: 1281px) {
        width: 7.2rem;
      }
      @media screen and (min-width: 1282px) {
        width: 8.2rem;
      }
    }
  }
`;

export const UnderLine2 = styled.div<running>`
  ${tw`bg-bud-blue`}
  height: 2px;
  width: 1rem;
  margin-left: min(1.7rem);

  @media screen and (max-width: 640px) {
    height: 2px;
    width: 2.2rem;
    margin-left: 3rem;
  }
  @media screen and (min-width: 641px) and (max-width: 768px) {
    height: 4px;
    width: 4.3rem;
    margin-left: 5.8rem;
  }
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    height: 8px;
    width: 5.5rem;
    margin-left: 7.6rem;
  }
  @media screen and (min-width: 1025px) and (max-width: 1281px) {
    height: 12px;
    width: 7.2rem;
    margin-left: 9.5rem;
  }
  @media screen and (min-width: 1282px) {
    height: 12px;
    width: 8.2rem;
    margin-left: 11.5rem;
  }
  animation-name: BunderLine;
  animation-delay: 3.5s;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes BunderLine {
    0% {
      width: 0%;
    }
    100% {
      @media screen and (max-width: 640px) {
        width: 2.2rem;
      }
      @media screen and (min-width: 641px) and (max-width: 768px) {
        width: 4.3rem;
      }
      @media screen and (min-width: 769px) and (max-width: 1024px) {
        width: 5.5rem;
      }
      @media screen and (min-width: 1025px) and (max-width: 1281px) {
        width: 7.2rem;
      }
      @media screen and (min-width: 1282px) {
        width: 8.2rem;
      }
    }
  }
`;
