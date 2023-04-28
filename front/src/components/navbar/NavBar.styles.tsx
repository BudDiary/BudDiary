import styled from "styled-components";
import tw from "twin.macro";
// import { Link} from 'react-router-dom';

export const NavbarContainer = styled.div`
  ${tw`flex bg-bud-yellow justify-between md:px-[20%] sm:px-[10%] px-[20px]`}
  height: 56px;
`;

export const LogoContainer = styled.div`
  ${tw`flex font-berry text-4xl my-auto`}
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

export const MobileMenu = styled.div`
  ${tw`my-auto text-2xl visible sm:invisible`}
`;
