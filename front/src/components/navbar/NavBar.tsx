import React from 'react'
import { LogoBlue,LogoContainer,LogoGreen, MenuItem,ProfileContainer,ProfileItem, NavbarContainer, MobileMenu, NavbarBox } from './NavBar.styles'
import {RxHamburgerMenu} from 'react-icons/rx'


export default function NavBar() {
  const showSidebar = () => {
    alert('사이드바 보여줄거여')
  }
  return (
    <NavbarContainer>
      <NavbarBox>
        <LogoContainer>
            <LogoBlue>Bud</LogoBlue>
            <LogoGreen>:D</LogoGreen>
            <LogoBlue>iary</LogoBlue>
        </LogoContainer>
        <MenuItem>
          그룹일기
        </MenuItem>
        <MenuItem>
          일기작성
        </MenuItem>
        <ProfileContainer>
          로그인
          <ProfileItem></ProfileItem>
        </ProfileContainer>
        <MobileMenu><RxHamburgerMenu onClick={showSidebar}/></MobileMenu>
      </NavbarBox>
    </NavbarContainer>
  )
}
