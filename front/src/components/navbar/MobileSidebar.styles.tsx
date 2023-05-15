import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";

export const SideBarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 20;
  ${tw`bg-white w-[55%] h-[65%] mt-10`}
  border-radius: 0 0 0 20px;
`;

export const SidebarHeader = styled(Link)`
  ${tw`flex flex-row justify-center rounded-md mt-2 font-berry `}
  font-size: 30px;
`;

export const SideBarMenuBox = styled.div`
  ${tw``}
`;
export const SideBarMenuSelect = styled.div`
  ${tw`my-6 font-berry`}
`;

export const SideBarMenuItem = styled(Link)`
  ${tw`flex items-center justify-center rounded-full hover:bg-gray-200`}
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
  ${tw`flex items-center flex-col mt-6`}

  h3 {
    ${tw`font-hassam text-xl`}
  }
`;

export const LogOutButton = styled.button`
  ${tw`text-bud-pink bg-gray-200 px-2 py-1 rounded-sm`}
`;
