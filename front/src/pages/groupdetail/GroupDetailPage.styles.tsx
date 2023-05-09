import styled from "styled-components";
import tw from "twin.macro";

export const DetailPageContainer = styled.div`
  ${tw`grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10`}
`;

export const DiariesContainer = styled.div`
  ${tw`sm:col-span-2`}
  display: flex;
  justify-content: center;
  padding-block: 20px;
  > * {
    margin: auto;
  }
`;

export const GroupInfoContainer = styled.div`
  ${tw`flex justify-center pt-20`}
  position: sticky;
  top: 10;
`;
