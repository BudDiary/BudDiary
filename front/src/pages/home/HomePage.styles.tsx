import styled from "styled-components";

export const Container = styled.div`
  overflow: auto;
  scroll-snap-type: y mandatory;
  height: calc(100vh - 42px);

  ::-webkit-scrollbar {
    display: none;
  }
`;
