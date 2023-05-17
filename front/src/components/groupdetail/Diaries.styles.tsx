import styled from "styled-components";
import tw from "twin.macro";

export const BasicButton = styled.button`
  ${tw`bg-bud-blue rounded-full px-4 py-1 font-berry`}
  letter-spacing: 0.1rem;
  font-size: 12px;

  @media (max-width: 640px) {
    ${tw`bg-bud-blue rounded-full px-2 py-1 font-berry`}
    font-size: 8px;
    letter-spacing: 0.1rem;
  }
`;

export const GroupButton = styled.button`
  ${tw`bg-bud-green rounded-full px-4 py-1 font-berry fixed `}
  bottom: 25px;
  right: 15px;
  font-size: 15px;
`;

export const DeleteButton = styled.button`
  ${tw`bg-bud-pink rounded-full px-3 py-1 font-bold my-2`}
  width: 100px;
  color: white;
`;

export const EmojiButton = styled.button`
  ${tw`bg-bud-blue rounded-full px-4 py-1 font-berry`}
  letter-spacing: 0.1rem;
`;

export const WideButton = styled.button`
  ${tw`bg-bud-blue py-2 px-4 rounded-md font-berry text-black flex items-center justify-center`}
  width: 45vw;
  border: 2px solid #c3cfe3;

  svg {
    ${tw`mr-2`}
  }

  @media (max-width: 640px) {
    width: 90vw;
  }
`;

export const DiaryDetail = styled.div`
  ${tw`sm:col-span-2 bg-white rounded-md`}
  width: 45vw;
  margin-block: 30px;
  padding: 20px;
  border: 2px solid #c3cfe3;
  > * {
    margin: auto;
  }

  @media (max-width: 640px) {
    width: 90vw;
  }
`;

export const DiaryHeader = styled.div`
  ${tw`flex items-center mb-2`}
  width: 40vw;
  height: 50px;

  img {
    border-radius: 100%;
    width: 50px;
    height: 50px;
    border: 2px solid #abc4ff;
    margin-right: 10px;
  }
  h2 {
    ${tw`font-hassam`}
    font-weight: bold;
  }
  h3 {
    ${tw`font-hassam text-gray-400 font-bold`}
  }

  @media (max-width: 640px) {
    width: 75vw;
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
    border: 4px solid pink;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  img {
    width: 100%;
    height: 250px;
    border-radius: 20px;
    border: 4px solid pink;
  }

  @media (max-width: 640px) {
    height: auto;
    flex-direction: column;

    > div:first-child {
      height: auto;
      margin-inline: 0;
      margin-bottom: 1rem;
      flex: none;
    }

    > div:last-child {
      flex: none;
      width: 100%;
      height: auto;
      margin: 0;
      padding: 20px;
      height: 250px;
      border: 4px solid pink;
      border-radius: 15px;
    }

    img {
      width: 100%;
      height: 250px;
      border-radius: 20px;
      border: 4px solid pink;
    }
  }
`;

export const DiaryImageSlider = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  max-width: 60%;

  &::-webkit-scrollbar {
    display: none;
  }

  & > .swiper-button-prev,
  & > .swiper-button-next {
    position: absolute;
    top: 50%;
    width: 50px;
    height: 50px;
    transform: translateY(-50%);
    border-radius: 30%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    z-index: 1;
  }

  & > .swiper-button-prev {
    left: 0;
    background-image: url("../../assets/prev_button.png");
  }

  & > .swiper-button-next {
    right: 0;
    background-image: url("../../assets/next_button.png");
  }

  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    max-width: 100%;

    & > .swiper-button-prev,
    & > .swiper-button-next {
      width: 30px;
      height: 30px;
      transform: translateY(-50%) scale(0.8);
    }
  }
`;

export const DiaryImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
`;

export const DiaryText = styled.div`
  ${tw`font-berry`}
  display: "flex",
  justifyContent: "flex-start",
  margin: 0,
`;

export const EditContent = styled.div`
  ${tw`flex flex-col rounded-md w-full mt-2 px-2 px-4 `}
  p {
    ${tw`mb-2 ml-4`}
  }
`;

export const BlankNotice = styled.div`
  ${tw`flex flex-row rounded-md mt-2`}
  font-size: 50px;
  font-weight: bold;
  @media (max-width: 640px) {
    font-size: 45px;
    font-weight: bold;
  }
`;
export const BlankDiary = styled.div`
  ${tw`flex flex-col rounded-md mt-2 font-berry`}
  font-size: 28px;
  justify-content: center;
  align-items: center;
  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

export const DiaryDetailBlank = styled.div`
  ${tw`sm:col-span-2 bg-white rounded-md flex flex-col justify-center items-center`}
  width: 45vw;
  margin: 30px 0;
  padding-block: 150px;
  border: 2px solid #c3cfe3;

  > * {
    margin: auto;
  }

  @media (max-width: 640px) {
    width: 90vw;
  }
`;
export const ReactionSet = styled.div`
  ${tw`relative`}

  > div {
    ${tw`flex items-baseline`}
  }

  @media (max-width: 640px) {
    ${tw`flex-col`}
  }
`;
