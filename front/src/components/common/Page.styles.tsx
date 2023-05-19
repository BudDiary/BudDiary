import styled from "styled-components";
import tw from "twin.macro";

interface img {
  img: string;
}

export const PageContainer = styled.div`
  ${tw`max-w-[1152px] mx-auto`}
`;

export const SubNavContainer = styled.div<{ img: string }>`
  position: relative;
  background-image: url(${(props) => props.img});
  ${tw`bg-cover bg-center sm:h-[180px] h-0 text-center sm:pt-16 opacity-80 text-[0px] text-white sm:text-7xl`};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(172, 172, 172, 0.2);
    z-index: -1;
  }
`;

export const DetailSubNavContainer = styled.div`
  ${tw`bg-cover bg-center sm:h-[180px] h-0 text-center sm:pt-16 text-[0px] opacity-80 text-white sm:text-7xl`};
`;
