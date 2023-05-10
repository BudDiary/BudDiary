import React, { useEffect } from "react";
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
import { KAKAO_AUTH_URL, api } from "../../apis/axiosConfig";
import useMember from "../../hooks/memberHook";
import { useNavigate } from "react-router-dom";
import { LogOutButton } from "./MobileSidebar.styles";
import { useCookies } from 'react-cookie'; 
import { deleteTokenApi } from "../../apis/userApi";


export default function NavBar() {
  // const [cookies, setCookie, removeCookie] = useCookies(['AccessToken']);
  const [cookies, setCookie, removeCookie] = useCookies(['AccessToken', 'RefreshToken']);
  const [sideBarState, setSidebarState] = useState(false);
  const {memberData, isLoggedIn, logout} = useMember();
  const navigate = useNavigate();
  const nickname = memberData.nickname
  const profilePic = memberData.profilePic

  useEffect(() => {
    console.log('Cookies:', cookies);
  }, [cookies]);




  const handleLogout = () => {
    deleteTokenApi();
    logout();
    // localStorage.removeItem('token')

  }

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
        {/* {isLoggedIn && <LogOutButton onClick={handleLogout}>로그아웃</LogOutButton>} */}
        <LogOutButton onClick={handleLogout}>로그아웃</LogOutButton>

        <MobileMenu>
          <RxHamburgerMenu onClick={showSidebar} />
        </MobileMenu>



      </NavbarBox>
    </NavbarContainer>
    </div>
  );
}

