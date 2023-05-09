import React from 'react'
import { BackgroundContainer } from '../common/ModalWindow.styles'
import { SideBarContainer, SideBarProfileSection, SideBarMenuItem, SideBarMenuBox, LogOutButton } from './MobileSidebar.styles'

export default function MobileSidebar() {
  return (
    <>
      <BackgroundContainer></BackgroundContainer>
      <SideBarContainer>
        <SideBarProfileSection>ㅎㅎㅎ</SideBarProfileSection>
        <SideBarMenuBox>
          <SideBarMenuItem to='/group'>그룹일기</SideBarMenuItem>
        </SideBarMenuBox>
        <SideBarMenuBox>
          <SideBarMenuItem to='/write'>일기작성</SideBarMenuItem>
        </SideBarMenuBox>
        <SideBarMenuBox>
          <SideBarMenuItem to='/mypgae'>마이페이지</SideBarMenuItem>
        </SideBarMenuBox>
        <LogOutButton>로그아웃</LogOutButton>
      </SideBarContainer>
    </>
  )
}
