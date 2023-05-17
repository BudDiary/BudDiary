import styled from "styled-components";
import tw from "twin.macro";

export const TitleSection = styled.div`
  ${tw`my-2 font-berry text-2xl`}

  animation-name: AppearText;
  animation-delay: 0s;
  animation-duration: 1.5s;
  animation-fill-mode: both;

  @keyframes AppearText {
    0% {
      ${tw`opacity-0`}
      transform: translateY(20px);
    }
    100% {
      ${tw`opacity-100`}
      transform: translateY(0px);
    }
  }
`;

export const ProfileSection = styled.div`
  ${tw``}

  animation-name: AppearText;
  animation-delay: 0.5s;
  animation-duration: 1.5s;
  animation-fill-mode: both;
`;

export const ApplyButton = styled.button`
  ${tw`bg-bud-blue text-white w-[100%] py-2 rounded-md`}
`;
