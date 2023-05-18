import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";

import { keyframes } from "styled-components";

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-3px);
  }
  60% {
    transform: translateY(-2px);
  }
`;
export const SideBarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99;
  ${tw`bg-white w-[250px] h-[430px] mt-10 border-t-2 border-r-0 border-l-4 border-b-2 border-bud-blue`}
  border-radius: 0 0 0 20px;
`;

export const ButtonLink = styled(Link)`
  ${``}
`;

export const SidebarHeader = styled(Link)`
  ${tw`flex flex-row justify-center rounded-md mt-2 font-berry text-[25px]`}
`;

export const SideBarMenuBox = styled.div`
  ${tw``}
`;
export const SideBarMenuSelect = styled.div`
  ${tw`mt-3 font-berry flex justify-center items-center`}
`;

export const SideBarMenuItem = styled(Link)`
  ${tw`flex items-center justify-center rounded-md hover:bg-gray-200 px-5 w-[200px] h-[35px]`}
`;

export const SideUserInfo = styled.div`
  ${tw`flex flex-col items-center pt-3`}

  img {
    ${tw`border-2 border-bud-blue rounded-full p-1`}
    width: 100px;
    height: 100px;
  }
  h2 {
    ${tw`font-berry text-lg my-2`}
  }
`;

export const SideMyPage = styled.div`
  ${tw`flex items-center justify-center`}
`;
export const SideNotice = styled.div`
  ${tw`flex items-center flex-col text-xl font-bold`}
  h3 {
    ${tw`font-inkLip text-xl mt-20 w-[70%] mb-20`}
  }
  div {
    ${tw`flex justify-center my-1 font-hassam`}
    animation: ${bounceAnimation} 1s ease-in-out;
  }
  p {
    ${tw`flex justify-end ml-1 my-1 font-inkLip`}
  }
`;

export const LogOutButton = styled.button`
  ${tw`text-bud-pink bg-gray-200 px-2 py-1 rounded-sm`}
`;

export const LoginButton = styled.button`
  ${tw`bg-bud-blue flex justify-center font-hassam text-white px-3 py-2 rounded-md text-sm`}

  animation: ${bounceAnimation} 1s ease-in-out 3;

  img {
    ${tw`mx-1 w-[20px] h-[20px]`}
    border-radius: 15%;
  }
`;
