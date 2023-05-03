import React from "react";
import {
  LogoBlue,
  LogoContainer,
  LogoGreen,
  MenuItem,
  ProfileContainer,
  ProfileItem,
  NavbarContainer,
  MobileMenu,
  NavbarBox,
} from "./NavBar.styles";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileSidebar from "./MobileSidebar";
import { useState } from "react";

export default function NavBar() {
  const [sideBarState, setSidebarState] = useState(false);
  const showSidebar = () => {
    setSidebarState(true)
  };
  return (
    <div>
      {sideBarState === true ? <MobileSidebar /> : null}
    <NavbarContainer>
      <NavbarBox>
        <LogoContainer to='/'>
          <LogoBlue>Bud</LogoBlue>
          <LogoGreen>:D</LogoGreen>
          <LogoBlue>iary</LogoBlue>
        </LogoContainer>
        <MenuItem to='/group'>그룹일기</MenuItem>
        <MenuItem to='/write'>일기작성</MenuItem>
        <ProfileContainer>
          로그인
          <ProfileItem></ProfileItem>
        </ProfileContainer>
        <MobileMenu>
          <RxHamburgerMenu onClick={showSidebar} />
        </MobileMenu>
      </NavbarBox>
    </NavbarContainer>
    </div>
  );
}
