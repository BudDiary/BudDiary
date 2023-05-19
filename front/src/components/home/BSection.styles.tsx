import styled from "styled-components";
import tw from "twin.macro";
import crying from "../../assets/crying.png";
import excited from "../../assets/excited.png";
import happy from "../../assets/happy.png";
import normal from "../../assets/normal.png";
import sad from "../../assets/sad.png";

interface ImageSectionProps {
  run: string;
}

interface running {
  run: string;
}

interface timer {
  run: string;
  time: string;
}

export const Container = styled.div`
  ${tw`flex flex-col sm:flex-none relative bg-bud-yellow`}
`;

export const SectionContainer = styled.div`
  ${tw`relative flex justify-center sm:items-center max-w-[1152px] mx-auto`}
  height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  cursor: default;

  @media screen and (max-width: 640px) {
    padding-top: 10%;
  }
`;

/* background-image: url(${(props) => props.Image}); */
export const ImageSection = styled.div<running>`
  ${tw`rounded-md flex`}
  width: 50%;
  height: 80%;
  min-height: calc(220px + 40%);

  @media screen and (max-width: 640px) {
    ${tw`bg-center`}
    width: 50%;
    height: 30vh;
    min-height: 250px;
  }

  @media screen and (max-width: 1152px) {
    ${tw`bg-center`}
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

export const FirstImageBox = styled.div`
  ${tw``}
  width:45%;
  height: 100%;

  @media screen and (max-width: 640px) {
    width: 80%;
    height: 100%;
    overflow: hidden;
    ${tw`bg-center`}
  }
`;

export const SecondImageBox = styled.div`
  ${tw`ml-2`}
  width:50%;
  height: 50%;

  @media screen and (max-width: 640px) {
    display: none;
  }
`;

export const TextContainer = styled.div`
  ${tw`h-full flex justify-center sm:flex sm:flex-col`}
  width:50%;
`;

export const TextSection = styled.div`
  ${tw`text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl flex flex-col justify-around`}
  width: 100%;
  height: 40%;
  min-height: 200px;

  @media screen and (max-width: 640px) {
    transform: translateY(0px);
    font-size: 2rem;
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

export const SecondBox = styled.div`
  ${tw``}
`;

export const SecondDetail = styled.p<running>`
  ${tw`flex`}

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
  ${tw`text-2xl flex`}
  height: 40%;
  width: 100%;

  @media screen and (max-width: 640px) {
    display: none;
  }

  animation-name: showEmoji;
  animation-duration: 4s;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes showEmoji {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const Excited = styled.div<running>`
  ${tw`bg-no-repeat bg-top bg-contain`}
  background-image: url(${excited});
  width: 20%;

  animation-name: FirstEmoji;
  animation-delay: 4s;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes FirstEmoji {
    0% {
      ${tw`bg-bottom`}
    }
    14.25% {
      ${tw`bg-top`}
      transform : translate(0px,0px);
    }
    28.5% {
      ${tw`bg-top`}
      transform : translateX(400%);
    }
    43% {
      ${tw`bg-bottom`}
      transform : translateX(400%);
    }
    55.25% {
      ${tw`bg-bottom`}
      transform : translateX(300%);
    }
    69.5% {
      ${tw`bg-bottom`}
      transform : translateX(200%);
    }
    83.75% {
      ${tw`bg-bottom`}
      transform : translateX(100%);
    }
    100% {
      ${tw`bg-bottom`}
      transform : translateX(0%);
    }
  }
`;

export const Happy = styled.div<running>`
  ${tw`bg-no-repeat bg-bottom bg-contain`}
  background-image: url(${happy});
  width: 20%;

  animation-name: SecondEmoji;
  animation-delay: 4s;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes SecondEmoji {
    0% {
      ${tw`bg-bottom`}
    }
    14.25% {
      ${tw`bg-bottom`}
      transform : translateX(-100%);
    }
    28.5% {
      ${tw`bg-top`}
      transform : translateX(-100%);
    }
    43% {
      ${tw`bg-top`}
      transform : translateX(300%);
    }
    55.25% {
      ${tw`bg-bottom`}
      transform : translateX(300%);
    }
    69.5% {
      ${tw`bg-bottom`}
      transform : translateX(200%);
    }
    83.75% {
      ${tw`bg-bottom`}
      transform : translateX(100%);
    }
    100% {
      ${tw`bg-bottom`}
      transform : translateX(0%);
    }
  }
`;

export const Normal = styled.div<running>`
  ${tw`bg-no-repeat bg-bottom bg-contain`}
  background-image: url(${normal});
  width: 20%;

  animation-name: ThirdEmoji;
  animation-delay: 4s;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes ThirdEmoji {
    0% {
      ${tw`bg-bottom`}
    }
    14.25% {
      ${tw`bg-bottom`}
      transform : translateX(-100%);
    }
    28.5% {
      ${tw`bg-bottom`}
      transform : translateX(-200%);
    }
    43% {
      ${tw`bg-top`}
      transform : translateX(-200%);
    }
    55.25% {
      ${tw`bg-top`}
      transform : translateX(200%);
    }
    69.5% {
      ${tw`bg-bottom`}
      transform : translateX(200%);
    }
    83.75% {
      ${tw`bg-bottom`}
      transform : translateX(100%);
    }
    100% {
      ${tw`bg-bottom`}
      transform : translateX(0%);
    }
  }
`;

export const Sad = styled.div<running>`
  ${tw`bg-no-repeat bg-bottom bg-contain`}
  background-image: url(${sad});
  width: 20%;

  animation-name: FourthEmoji;
  animation-delay: 4s;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes FourthEmoji {
    0% {
      ${tw`bg-bottom`}
    }
    14.25% {
      ${tw`bg-bottom`}
      transform : translateX(-100%);
    }
    28.5% {
      ${tw`bg-bottom`}
      transform : translateX(-200%);
    }
    43% {
      ${tw`bg-bottom`}
      transform : translateX(-300%);
    }
    55.25% {
      ${tw`bg-top`}
      transform : translateX(-300%);
    }
    69.5% {
      ${tw`bg-top`}
      transform : translateX(100%);
    }
    83.75% {
      ${tw`bg-bottom`}
      transform : translateX(100%);
    }
    100% {
      ${tw`bg-bottom`}
      transform : translateX(0%);
    }
  }
`;

export const Crying = styled.div<running>`
  ${tw`bg-no-repeat bg-bottom bg-contain`}
  background-image: url(${crying});
  width: 20%;

  animation-name: FifthEmoji;
  animation-delay: 4s;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes FifthEmoji {
    0% {
      ${tw`bg-bottom`}
    }
    14.25% {
      ${tw`bg-bottom`}
      transform : translateX(-100%);
    }
    28.5% {
      ${tw`bg-bottom`}
      transform : translateX(-200%);
    }
    43% {
      ${tw`bg-bottom`}
      transform : translateX(-300%);
    }
    55.25% {
      ${tw`bg-bottom`}
      transform : translateX(-400%);
    }
    69.5% {
      ${tw`bg-top`}
      transform : translateX(-400%);
    }
    83.75% {
      ${tw`bg-top`}
      transform : translateX(0%);
    }
    100% {
      ${tw`bg-bottom`}
      transform : translateX(0%);
    }
  }
`;

export const WordsSection = styled.div<running>`
  ${tw`absolute text-center w-full z-20 text-3xl flex left-1/2`}
  transform:translateX(-50%);
  padding-top: min(320px);
  width: 90%;
  min-height: 90%;
  @media screen and (min-width: 640px) {
    display: none;
  }

  animation-name: showEmoji;
  animation-duration: 4s;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes showEmoji {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const SExcited = styled.div<running>`
  ${tw`bg-no-repeat bg-top bg-contain`}
  background-image: url(${excited});
  width: 20%;

  animation-name: FirstEmoji;
  animation-delay: 4s;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes FirstEmoji {
    0% {
      ${tw`bg-bottom`}
    }
    14.25% {
      ${tw`bg-center`}
      transform : translate(0px,0px);
    }
    28.5% {
      ${tw`bg-center`}
      transform : translateX(400%);
    }
    43% {
      ${tw`bg-bottom`}
      transform : translateX(400%);
    }
    55.25% {
      ${tw`bg-bottom`}
      transform : translateX(300%);
    }
    69.5% {
      ${tw`bg-bottom`}
      transform : translateX(200%);
    }
    83.75% {
      ${tw`bg-bottom`}
      transform : translateX(100%);
    }
    100% {
      ${tw`bg-bottom`}
      transform : translateX(0%);
    }
  }
`;

export const SHappy = styled.div<running>`
  ${tw`bg-no-repeat bg-bottom bg-contain`}
  background-image: url(${happy});
  width: 20%;

  animation-name: SecondEmoji;
  animation-delay: 4s;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes SecondEmoji {
    0% {
      ${tw`bg-bottom`}
    }
    14.25% {
      ${tw`bg-bottom`}
      transform : translateX(-100%);
    }
    28.5% {
      ${tw`bg-center`}
      transform : translateX(-100%);
    }
    43% {
      ${tw`bg-center`}
      transform : translateX(300%);
    }
    55.25% {
      ${tw`bg-bottom`}
      transform : translateX(300%);
    }
    69.5% {
      ${tw`bg-bottom`}
      transform : translateX(200%);
    }
    83.75% {
      ${tw`bg-bottom`}
      transform : translateX(100%);
    }
    100% {
      ${tw`bg-bottom`}
      transform : translateX(0%);
    }
  }
`;

export const SNormal = styled.div<running>`
  ${tw`bg-no-repeat bg-bottom bg-contain`}
  background-image: url(${normal});
  width: 20%;

  animation-name: ThirdEmoji;
  animation-delay: 4s;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes ThirdEmoji {
    0% {
      ${tw`bg-bottom`}
    }
    14.25% {
      ${tw`bg-bottom`}
      transform : translateX(-100%);
    }
    28.5% {
      ${tw`bg-bottom`}
      transform : translateX(-200%);
    }
    43% {
      ${tw`bg-center`}
      transform : translateX(-200%);
    }
    55.25% {
      ${tw`bg-center`}
      transform : translateX(200%);
    }
    69.5% {
      ${tw`bg-bottom`}
      transform : translateX(200%);
    }
    83.75% {
      ${tw`bg-bottom`}
      transform : translateX(100%);
    }
    100% {
      ${tw`bg-bottom`}
      transform : translateX(0%);
    }
  }
`;

export const SSad = styled.div<running>`
  ${tw`bg-no-repeat bg-bottom bg-contain`}
  background-image: url(${sad});
  width: 20%;

  animation-name: FourthEmoji;
  animation-delay: 4s;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes FourthEmoji {
    0% {
      ${tw`bg-bottom`}
    }
    14.25% {
      ${tw`bg-bottom`}
      transform : translateX(-100%);
    }
    28.5% {
      ${tw`bg-bottom`}
      transform : translateX(-200%);
    }
    43% {
      ${tw`bg-bottom`}
      transform : translateX(-300%);
    }
    55.25% {
      ${tw`bg-center`}
      transform : translateX(-300%);
    }
    69.5% {
      ${tw`bg-center`}
      transform : translateX(100%);
    }
    83.75% {
      ${tw`bg-bottom`}
      transform : translateX(100%);
    }
    100% {
      ${tw`bg-bottom`}
      transform : translateX(0%);
    }
  }
`;

export const SCrying = styled.div<running>`
  ${tw`bg-no-repeat bg-bottom bg-contain`}
  background-image: url(${crying});
  width: 20%;

  animation-name: FifthEmoji;
  animation-delay: 4s;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-play-state: ${(props) => props.run};

  @keyframes FifthEmoji {
    0% {
      ${tw`bg-bottom`}
    }
    14.25% {
      ${tw`bg-bottom`}
      transform : translateX(-100%);
    }
    28.5% {
      ${tw`bg-bottom`}
      transform : translateX(-200%);
    }
    43% {
      ${tw`bg-bottom`}
      transform : translateX(-300%);
    }
    55.25% {
      ${tw`bg-bottom`}
      transform : translateX(-400%);
    }
    69.5% {
      ${tw`bg-center`}
      transform : translateX(-400%);
    }
    83.75% {
      ${tw`bg-center`}
      transform : translateX(0%);
    }
    100% {
      ${tw`bg-bottom`}
      transform : translateX(0%);
    }
  }
`;

export const UnderLine = styled.p<timer>`
  ${tw`absolute border-bud-green`}
  height: 2px;
  width: 0%;

  animation-name: BunderLine;
  animation-delay: ${(props) => props.time};
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.89, -0.015, 0, 0.995);
  animation-play-state: ${(props) => props.run};

  @keyframes BunderLine {
    0% {
      ${tw`border`}
    }
    1% {
      ${tw`border-2`}
      width: 0%;
    }
    100% {
      width: 100%;
      ${tw`border-2`}
    }
  }
`;

export const ImgMargin = styled.div`
  ${tw`h-[50%]`}
`;

export const ImgBox = styled.div`
  ${tw`h-[50%]`}
`;

// @media screen and (max-width: 640px) {
//   height: 2px;
//   width: 2.2rem;
//   margin-left: 1.7rem;
// }
// @media screen and (min-width: 641px) and (max-width: 768px) {
//   height: 4px;
//   width: 4.3rem;
//   margin-left: 3rem;
// }
// @media screen and (min-width: 769px) and (max-width: 1024px) {
//   height: 8px;
//   width: 5.5rem;
//   margin-left: 4.2rem;
// }
// @media screen and (min-width: 1025px) and (max-width: 1281px) {
//   height: 12px;
//   width: 7.2rem;
//   margin-left: 5rem;
// }
// @media screen and (min-width: 1282px) {
//   height: 12px;
//   width: 8.2rem;
//   margin-left: 6rem;
// }
// animation-name: BunderLine;
// animation-delay: 3s;
// animation-duration: 1s;
// animation-fill-mode: both;
// animation-play-state: ${(props) => props.run};
// @keyframes BunderLine {
//   0% {
//     width: 0%;
//   }
//   100% {
//     @media screen and (max-width: 640px) {
//       width: 2.2rem;
//     }
//     @media screen and (min-width: 641px) and (max-width: 768px) {
//       width: 4.3rem;
//     }
//     @media screen and (min-width: 769px) and (max-width: 1024px) {
//       width: 5.5rem;
//     }
//     @media screen and (min-width: 1025px) and (max-width: 1281px) {
//       width: 7.2rem;
//     }
//     @media screen and (min-width: 1282px) {
//       width: 8.2rem;
//     }
//   }
// }

// export const UnderLine2 = styled.div<running>`
//   ${tw`bg-bud-blue`}
//   height: 2px;
//   width: 1rem;
//   margin-left: min(1.7rem);

//   @media screen and (max-width: 640px) {
//     height: 2px;
//     width: 2.2rem;
//     margin-left: 3rem;
//   }
//   @media screen and (min-width: 641px) and (max-width: 768px) {
//     height: 4px;
//     width: 4.3rem;
//     margin-left: 5.8rem;
//   }
//   @media screen and (min-width: 769px) and (max-width: 1024px) {
//     height: 8px;
//     width: 5.5rem;
//     margin-left: 7.6rem;
//   }
//   @media screen and (min-width: 1025px) and (max-width: 1281px) {
//     height: 12px;
//     width: 7.2rem;
//     margin-left: 9.5rem;
//   }
//   @media screen and (min-width: 1282px) {
//     height: 12px;
//     width: 8.2rem;
//     margin-left: 11.5rem;
//   }
//   animation-name: BunderLine;
//   animation-delay: 3.5s;
//   animation-duration: 1s;
//   animation-fill-mode: both;
//   animation-play-state: ${(props) => props.run};

//   @keyframes BunderLine {
//     0% {
//       width: 0%;
//     }
//     100% {
//       @media screen and (max-width: 640px) {
//         width: 2.2rem;
//       }
//       @media screen and (min-width: 641px) and (max-width: 768px) {
//         width: 4.3rem;
//       }
//       @media screen and (min-width: 769px) and (max-width: 1024px) {
//         width: 5.5rem;
//       }
//       @media screen and (min-width: 1025px) and (max-width: 1281px) {
//         width: 7.2rem;
//       }
//       @media screen and (min-width: 1282px) {
//         width: 8.2rem;
//       }
//     }
//   }
// `;
