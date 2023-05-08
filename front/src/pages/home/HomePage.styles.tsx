import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.div`
  ${tw`overflow-x-hidden font-inkLip`}
  overflow: auto;
  scroll-snap-type: y mandatory;
  height: calc(100vh - 42px);

  ::-webkit-scrollbar {
    display: none;
  }
`;
