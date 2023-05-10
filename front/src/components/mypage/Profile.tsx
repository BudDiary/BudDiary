import React, { useState } from "react";
import Swal from 'sweetalert2';
import { FullRoundedButton } from "../common/Button.styles";
import ProfileEditModal from "./ProfileEditModal";
import { BsCoin } from 'react-icons/bs'
import { userdummy } from "./userdummy";
import { NicknameBox, UserProfileContainer, IntroContainer, ProfilePicSection, ProfileInfoSection, PointsButton, ChangeProfileSection } from "./Profile.styles";
import useMember from "../../hooks/memberHook";
import ModalWindow from '../common/ModalWindow';

export default function Profile() {
  const [profileModalState, setProfileModalState] = useState(false);
  const { memberData, isLoggedIn } = useMember();
  const profilePic = memberData.profilePic
  const nickname = memberData.nickname
  const points = memberData.points
  const intro = memberData.intro
  const showProfileModal = () => {
    setProfileModalState(true);
  }
  return (<UserProfileContainer>
    {profileModalState && <ModalWindow page={2} setModalOpen={setProfileModalState}/>}
    {/* {profileModalState === false ? null : <ProfileEditModal/>} */}
    <ProfilePicSection src={profilePic? profilePic: "base_profile.jpg"}></ProfilePicSection>
    <ProfileInfoSection>
      <NicknameBox>{nickname}</NicknameBox>
      <PointsButton>
        {points}pts
      </PointsButton>
    </ProfileInfoSection>
    <ChangeProfileSection>
    <FullRoundedButton onClick={showProfileModal} >프로필수정</FullRoundedButton>
    </ChangeProfileSection>
    <IntroContainer>
      <div>소개글</div>
      {intro}
    </IntroContainer>
  </UserProfileContainer>);
}
