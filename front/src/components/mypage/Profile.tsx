import React, { useState } from "react";
import Swal from "sweetalert2";
import { FullRoundedButton } from "../common/Button.styles";
import ProfileEditModal from "./ProfileEditModal";
import { BsCoin } from "react-icons/bs";
import { userdummy } from "./userdummy";
import {
  NicknameBox,
  UserProfileContainer,
  IntroContainer,
  ProfilePicSection,
  ProfileInfoSection,
  PointsButton,
  ChangeProfileSection,
  LogoutButtonContainer,
  IntroTitle,
} from "./Profile.styles";
import useMember from "../../hooks/memberHook";
import ModalWindow from "../common/ModalWindow";
import { LogOutButton } from "../navbar/MobileSidebar.styles";
import { deleteTokenApi } from "../../apis/userApi";

export default function Profile() {
  const [profileModalState, setProfileModalState] = useState(false);
  const { memberData, logout } = useMember();
  const profilePic = memberData.profilePic;
  const nickname = memberData.nickname;
  const points = memberData.points;
  const intro = memberData.intro;
  const showProfileModal = () => {
    setProfileModalState(true);
  };
  const handleLogout = () => {
    deleteTokenApi();
    logout();
  };
  return (
    <UserProfileContainer>
      {profileModalState && (
        <ModalWindow page={2} setModalOpen={setProfileModalState} />
      )}
      {/* {profileModalState === false ? null : <ProfileEditModal/>} */}
      <ProfilePicSection
        src={profilePic ? profilePic : "base_profile.jpg"}
      ></ProfilePicSection>
      <ProfileInfoSection>
        <NicknameBox>{nickname}</NicknameBox>
        <PointsButton to="/stickers">{points}pts</PointsButton>
        <FullRoundedButton onClick={showProfileModal}>
          프로필수정
        </FullRoundedButton>
      </ProfileInfoSection>
      {/* <ChangeProfileSection>
        <FullRoundedButton onClick={showProfileModal}>
          프로필수정
        </FullRoundedButton>
      </ChangeProfileSection> */}
      <IntroContainer>
        <IntroTitle>소개글</IntroTitle>
        {intro}
      </IntroContainer>
      <LogoutButtonContainer>
        <LogOutButton onClick={handleLogout}>로그아웃</LogOutButton>
      </LogoutButtonContainer>
    </UserProfileContainer>
  );
}
