import styled from "styled-components";
import tw from "twin.macro";

export const DetailPageContainer = styled.div`
  ${tw`grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10`}

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const DiariesContainer = styled.div`
  ${tw`sm:col-span-2 pt-[20px] flex-col px-4`}

  justify-content: center;
  > * {
    margin: auto;
  }
`;

export const GroupInfoContainer = styled.div`
  ${tw`flex justify-center pt-20`}
  position: sticky;
  top: 10;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
