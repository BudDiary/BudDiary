import styled from "styled-components";
import tw from "twin.macro";
import img from "./assets/ASectionimg.jpg";

export const SectionContainer = styled.div`
  ${tw`relative bg-bud-yellow flex flex-col justify-center items-center sm:flex-row`}
  height: 100vh;
  scroll-snap-align: start;
`;

export const ImageContainer = styled.div`
  ${tw`bg-cover bg-no-repeat bg-center rounded-md`}
  width: 45vh;
  height: 80vh;

  @media screen and (max-width: 640px) {
    width: 22.5vw;
    height: 40vh;
  }

  background-image: url(${img});
`;

export const TmpMargin = styled.div`
  ${tw``}
`;

export const TextContainer = styled.div`
  ${tw`text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl flex flex-col justify-between`}
  transform: translateY(-20%);
  width: 50vw;
  height: 50vh;

  @media screen and (max-width: 640px) {
    transform: translateY(0px);
    font-size: 2rem;
    height: 20vh;
  }
`;

export const FirstDetail = styled.div`
  ${tw``}
`;

export const SecondDetail = styled.div`
  ${tw``}
`;

export const ThirdDetail = styled.div`
  ${tw``}
`;
