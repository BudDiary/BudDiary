import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.div`
  ${tw`bg-bud-white`}
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 42px;
  z-index: 7;
`;

export const NavbarBox = styled.div`
  ${tw`flex max-w-[1152px] mx-auto justify-between`}
  height: 42px;
`;

export const LogoContainer = styled(Link)`
  ${tw`flex font-berry text-3xl my-auto ml-4`}
`;
export const LogoBlue = styled.div`
  ${tw`text-bud-blue`}
`;
export const LogoGreen = styled.div`
  ${tw`text-bud-green`}
`;
export const MenuItem = styled(Link)`
  ${tw`text-bud-black font-berry text-lg my-auto invisible sm:visible`}
`;

export const ProfileContainer = styled.div`
  ${tw`text-bud-black flex invisible sm:visible`}
`;

export const ProfileItem = styled.button`
  ${tw`bg-red-200`}
  width: 30px;
  height: 30px;
`;

export const MobileMenu = styled.button`
  ${tw`my-auto mr-4 text-2xl visible sm:hidden`}
`;

export const NavProfilePicContainer = styled.img`
  ${tw`hover:cursor-pointer w-[36px] h-[36px] border-2 border-gray-200 rounded-full mb-10 ml-2 mt-1`}
`;

export const NickNameContainer = styled.div`
  ${tw`hover:cursor-pointer font-bold mt-2`}
`;

export const AlarmContainer = styled.div`
  ${tw`hover:cursor-pointer ml-4  my-auto relative`}
`;

export const AlarmNumber = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  ${tw`bg-bud-pink rounded-full h-4 w-4 text-[4px] text-center text-white`}
`;

export const AlarmListContainer = styled.div`
  position: fixed;
  top: 42px;
  right: 0%;
  z-index: 15;
  ${tw`bg-white h-[75%] w-[320px] border-2 rounded-xl`}
`;
