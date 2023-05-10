import styled from "styled-components";
import tw from "twin.macro";
import navimg from "../../assets/subnav/WirteDiary.jpg";

export const PageContainer = styled.div`
  ${tw`max-w-[1152px] mx-auto`}
`;

export const SubNavContainer = styled.div`
  background-image: url(${navimg});
  ${tw`bg-cover bg-center sm:h-[180px] h-0 text-center sm:pt-16 text-[0px] opacity-80 text-white sm:text-7xl`};
`;
