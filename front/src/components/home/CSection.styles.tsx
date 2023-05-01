import styled from "styled-components";
import tw from "twin.macro";
import img from "./assets/CSectionimg.jpg";

export const SectionContainer = styled.div`
  ${tw`relative bg-contain`}
  height: 100vh;
  width: 100vw;
  scroll-snap-align: start;
`;

export const ImageContainer = styled.div`
  background-image: url(${img});
  ${tw`h-full bg-cover`}
`;
