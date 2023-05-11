import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";

export const SideBarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 15;
  ${tw`bg-white h-screen w-[80%]`}
`

export const SideBarProfileSection = styled.div`
  ${tw``}
`
export const SideBarMenuBox = styled.div`
  ${tw``}
`

export const SideBarMenuItem = styled(Link)`
  ${tw``}
`

export const LogOutButton = styled.button`
  /* position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 15; */
  ${tw``}
`