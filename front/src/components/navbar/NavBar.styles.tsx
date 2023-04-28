import styled from "styled-components";
import tw from "twin.macro";
// import { Link} from 'react-router-dom';

export const NavbarContainer = styled.div`
  ${tw`bg-bud-yellow`}
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  z-index: 7;
`;

export const NavbarBox = styled.div`
  ${tw`flex max-w-[1152px] mx-auto justify-between`}
  height: 56px;
`;

export const LogoContainer = styled.div`
  ${tw`flex font-berry text-4xl my-auto ml-4`}
`;
export const LogoBlue = styled.div`
  ${tw`text-bud-blue`}
`;
export const LogoGreen = styled.div`
  ${tw`text-bud-green`}
`;
export const MenuItem = styled.button`
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
