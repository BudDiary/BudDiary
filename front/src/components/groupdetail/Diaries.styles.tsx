import styled from "styled-components";
import tw from "twin.macro";
import close from "../../assets/modal/close.png";
export const BasicButton = styled.button`
  ${tw`bg-bud-blue rounded-full px-5 py-1 font-berry`}
  letter-spacing: 0.1rem;
`;

export const DeleteButton = styled.button`
  ${tw`bg-bud-pink rounded-full px-3 py-1 font-bold my-2`}
  width: 100px;
  color: white;
`;

export const WideButton = styled.button`
  ${tw`bg-bud-blue py-2 px-4 rounded-md font-berry text-black flex items-center justify-center`}
  width: 45vw;
  border: 5px solid #c3cfe3;

  svg {
    ${tw`mr-2`}
  }
`;

export const DiaryDetail = styled.div`
  ${tw`sm:col-span-2 bg-white rounded-md`}
  width: 45vw;
  margin-block: 30px;
  padding: 20px;
  border: 5px solid #c3cfe3;
  > * {
    margin: auto;
  }
`;

export const DiaryHeader = styled.div`
  ${tw`flex items-center mb-4`}
  width: 40vw;
  height: 50px;

  img {
    border-radius: 100%;
    width: 50px;
    height: 50px;
    border: 1px solid black;
    margin-right: 10px;
  }
  h2 {
    ${tw`font-hassam`}
    font-weight: bold;
  }
  h3 {
    ${tw`font-hassam text-gray-400 font-bold`}
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
  max-width: 60%;

  & > .swiper-button-prev,
  & > .swiper-button-next {
    position: absolute;
    top: 50%;
    width: 50px;
    height: 50px;
    transform: translateY(-50%);
    border-radius: 50%;
    background-image: url("../../assets/prev_button.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    z-index: 0;
  }

  & > .swiper-button-next {
    background-image: url("../../assets/next_button.png");
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
`;
export const BlankDiary = styled.div`
  ${tw`flex flex-col rounded-md mt-2 font-berry`}
  font-size: 28px;
  justify-content: center;
  align-items: center;
`;

export const DiaryDetailBlank = styled.div`
  ${tw`sm:col-span-2 bg-white rounded-md flex flex-col justify-center items-center`}
  width: 45vw;
  margin: 30px 0;
  padding-block: 150px;
  border: 5px solid #c3cfe3;

  > * {
    margin: auto;
  }
`;

export const ReactionSet = styled.div`
  ${tw`flex flex-col items-baseline relative`}

  div {
    ${tw`flex items-baseline`}
  }
`;
