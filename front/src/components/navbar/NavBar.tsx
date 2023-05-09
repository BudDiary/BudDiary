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
  NickNameContainer,
  NavProfilePicContainer
} from "./NavBar.styles";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileSidebar from "./MobileSidebar";
import { useState } from "react";
import { KAKAO_AUTH_URL } from "../../apis/axiosConfig";
import useMember from "../../hooks/memberHook";
import { useNavigate } from "react-router-dom";


export default function NavBar() {
  const [sideBarState, setSidebarState] = useState(false);
  const {memberData, isLoggedIn} = useMember();
  const navigate = useNavigate();
  const nickname = memberData.nickname
  const profilePic = memberData.profilePic
  
  const showSidebar = () => {
    setSidebarState(true);
  };
  const handleUser = () => {
    if (isLoggedIn === true ) {
      navigate("/mypage")
    } else {
      window.location.href =KAKAO_AUTH_URL 
    }
  }

  return (
    <div>
      {sideBarState === true ? <MobileSidebar /> : null}
    <NavbarContainer>
      <NavbarBox>
        <LogoContainer to="/">
          <LogoBlue>Bud</LogoBlue>
          <LogoGreen>:D</LogoGreen>
          <LogoBlue>iary</LogoBlue>
        </LogoContainer>
        <MenuItem to="/group">그룹일기</MenuItem>
        <MenuItem to="/write">일기작성</MenuItem>
        <ProfileContainer>
          <NickNameContainer onClick={handleUser}>{nickname}</NickNameContainer>
          <NavProfilePicContainer src={profilePic? profilePic: "base_profile.jpg"} onClick={handleUser}></NavProfilePicContainer>
        </ProfileContainer>
        <MobileMenu>
          <RxHamburgerMenu onClick={showSidebar} />
        </MobileMenu>
      </NavbarBox>
    </NavbarContainer>
    </div>
  );
}

