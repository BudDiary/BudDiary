import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.div`
  scroll-snap-align: start;
  height: 15vh;
  background-color: #d3d3d3;
`;

export const TextSection = styled.div`
  ${tw`flex flex-col justify-center font-mf`}
`;

export const FirstSection = styled.div`
  ${tw``}
  font-size:2rem;
  width: 100%;
`;

export const SecondSection = styled.div`
  ${tw``}
  font-size:1.2rem;
  width: 100%;
`;

export const ThirdSection = styled.div`
  ${tw``}
  font-size:1.2rem;
  width: 100%;
`;

export const FourthSection = styled.div`
  ${tw``}
  font-size:1rem;
  width: 100%;
`;
