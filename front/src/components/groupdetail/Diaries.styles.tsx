import styled from "styled-components";
import tw from "twin.macro";

export const BasicButton = styled.button`
  ${tw`bg-bud-blue rounded-full px-2 py-1 font-bold`}
`;

export const WideButton = styled.button`
  ${tw`bg-white py-2 px-4 rounded-md font-bold text-black`}
  width: 45vw;
  border: 1px solid black;
`;

export const DiaryDetail = styled.div`
  ${tw`sm:col-span-2 bg-white rounded-md`}
  width: 45vw;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid black;
  > * {
    margin: auto;
  }
`;

export const DiaryHeader = styled.div`
  ${tw`flex items-center mb-4`}
  width: 45vw;
  height: 50px;

  > div:first-child {
    margin-inline: 2rem;
  }

  img {
    border-radius: 100%;
    width: 50px;
    height: 50px;
    border: 1px solid black;
  }
`;

export const DiaryContent = styled.div`
  ${tw`flex items-center mb-4`}
  height: 250px;

  > div:first-child {
    margin-inline: 1rem;
    flex: 4;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > div:last-child {
    flex: 6;
    margin: 10px;
    padding: 20px;
    height: 250px;
    border: 3px solid pink;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  img {
    width: 150px;
    height: 200px;
    border: 1px solid black;
  }
`;
