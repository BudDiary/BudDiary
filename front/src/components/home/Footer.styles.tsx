import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.div`
  ${tw`flex justify-evenly items-center font-mf`}
  scroll-snap-align: start;
  height: 15vh;
  background-color: #d3d3d3;
`;

export const FirstSection = styled.div`
  ${tw``}
  font-size:2rem;
`;
export const TextSection = styled.div`
  ${tw`flex flex-col justify-center font-mf`}
`;

export const SecondSection = styled.div`
  ${tw``}
  font-size:1.2rem;
  height: 20%;
`;

export const ThirdSection = styled.div`
  ${tw``}
  font-size:1.2rem;
  height: 20%;
`;

export const FourthSection = styled.div`
  ${tw`overflow-hidden`}
  font-size:1rem;
  height: 20%;
`;
