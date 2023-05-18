import React from "react";
import { BackgroundContainer } from "../common/ModalWindow.styles";
import {
  SideBarContainer,
  SidebarHeader,
  SideBarMenuItem,
  SideBarMenuBox,
  SideBarMenuSelect,
  SideUserInfo,
  SideMyPage,
  SideNotice,
  ButtonLink,
  LoginButton,
} from "./MobileSidebar.styles";
import { AlarmContainer } from "./NavBar.styles";
import { MdHome, MdPowerSettingsNew } from "react-icons/md";
import { AiFillBell } from "react-icons/ai";
import { LogoGreen, LogoBlue } from "./NavBar.styles";
import { Divider } from "@mui/material";
import useMember from "../../hooks/memberHook";
import { deleteTokenApi } from "../../apis/userApi";
import { KAKAO_AUTH_URL } from "../../apis/axiosConfig";
import kakao from "../../assets/modal/kakaotalk.png";
interface SideBarProps {
  onClose: () => void;
}

export default function MobileSidebar({ onClose }: SideBarProps) {
  const { memberData, isLoggedIn, logout } = useMember();
  const handleLogout = () => {
    deleteTokenApi();
    logout();
  };

  const handleUser = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <>
      <BackgroundContainer onClick={onClose} />
      <SideBarContainer>
        <SidebarHeader onClick={onClose} to="/">
          <LogoBlue>Bud</LogoBlue>
          <LogoGreen>:D</LogoGreen>
          <LogoBlue>iary</LogoBlue>
        </SidebarHeader>
        <Divider style={{ border: "solid 1.5px #BFDBFE" }} />
        <SideBarMenuBox>
          {isLoggedIn ? (
            <>
              <SideUserInfo>
                <div>
                  <img src={memberData.profilePic || ""} alt="" />
                </div>
                <h2 style={{ display: "flex", justifyContent: "center" }}>
                  {memberData.nickname}
                </h2>
                <SideMyPage>
                  <ButtonLink to="/mypage">
                    <MdHome
                      onClick={onClose}
                      color="#ABC4FF"
                      size={28}
                      style={{ marginBottom: "5px" }}
                    />
                  </ButtonLink>

                  <MdPowerSettingsNew
                    onClick={handleLogout}
                    color="#ABC4FF"
                    size={28}
                    style={{ marginBottom: "5px", color: "red" }}
                  />
                </SideMyPage>
              </SideUserInfo>
              <Divider style={{ border: "solid 2px #BFDBFE" }} />
              <SideBarMenuSelect>
                <SideBarMenuItem onClick={onClose} to="/group">
                  그룹일기
                </SideBarMenuItem>
              </SideBarMenuSelect>
              <SideBarMenuSelect>
                <SideBarMenuItem onClick={onClose} to="/write">
                  일기작성
                </SideBarMenuItem>
              </SideBarMenuSelect>
              <SideBarMenuSelect>
                <SideBarMenuItem onClick={onClose} to="/stickers">
                  상점
                </SideBarMenuItem>
              </SideBarMenuSelect>
              <AlarmContainer>
                <AiFillBell className="text-3xl text-bud-green" />
              </AlarmContainer>
            </>
          ) : (
            <SideNotice>
              <h3>
                소중한 추억을
                <div>
                  <LogoBlue>Bud</LogoBlue>
                  <LogoGreen>:D</LogoGreen>
                  <LogoBlue>iary</LogoBlue>
                  <p>에서</p>
                </div>
                <p>공유해보세요.</p>
              </h3>
              <LoginButton onClick={handleUser}>
                <img src={kakao} alt="로그인" />
                으로 로그인하기
              </LoginButton>
            </SideNotice>
          )}
        </SideBarMenuBox>
      </SideBarContainer>
    </>
  );
}
