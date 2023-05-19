import styled from "styled-components";
import tw from "twin.macro";

export const DiaryItemContainer = styled.div`
  ${tw`border border-bud-blue border-b-2 rounded-lg mx-[20px] my-2 min-h-[400px] p-4 font-hassam sm:mx-0`}
`;

export const DiaryTypeBox = styled.div`
  ${tw`text-xl`}
`;

export const DiaryPicSlider = styled.div`
  ${tw`mt-6`}
  position: relative;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  max-width: 100%;

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
    border-radius: 50%;
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
