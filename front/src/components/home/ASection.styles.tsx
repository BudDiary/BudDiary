import styled from "styled-components";
import tw from "twin.macro";
import img from "./assets/ASectionimg.jpg";

export const SectionContainer = styled.div`
  ${tw`relative bg-contain`}
  height: calc(100vh - 56px);
  width: 100vw;
`;

export const ImgaeContainer = styled.div`
  background-image: url(${img});
  ${tw`h-full bg-cover bg-center`}
`;
