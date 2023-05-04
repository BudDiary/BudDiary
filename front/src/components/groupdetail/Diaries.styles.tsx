import styled from "styled-components";
import tw from "twin.macro";

export const BasicButton = styled.button`
  ${tw`bg-bud-blue rounded-full px-2 py-1 font-bold`}
`;
export const WideButton = styled.button`
  ${tw`bg-white py-2 px-4 rounded-md font-bold text-black flex items-center justify-center`}
  width: 40vw;
  border: 1px solid black;

  svg {
    ${tw`mr-2`}
  }
`;

export const DiaryDetail = styled.div`
  ${tw`sm:col-span-2 bg-white rounded-md`}
  width: 40vw;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid black;
  > * {
    margin: auto;
  }
`;

export const DiaryHeader = styled.div`
  ${tw`flex items-center mb-4`}
  width: 40vw;
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
    flex: 4.5;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > div:last-child {
    flex: 5.5;
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
    width: 100%;
    height: 200px;
    border: 1px solid black;
  }
`;

export const DiaryImageSlider = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  max-width: 60%; /* 변경: 슬라이드 전후 버튼의 표시 영역을 늘립니다. */

  & > .swiper-button-prev,
  & > .swiper-button-next {
    position: absolute;
    top: 50%;
    width: 50px;
    height: 50px;
    transform: translateY(-50%);
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    z-index: 0; /* 변경: z-index 값을 낮춰서 버튼을 클릭할 수 있도록 합니다. */
  }

  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

export const DiaryImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
`;
