import React, { useState } from "react";
import Swal from 'sweetalert2';
import { FullRoundedButton } from "../common/Button.styles";
import ProfileEditModal from "./ProfileEditModal";
import { BsCoin } from 'react-icons/bs'
import { userdummy } from "./userdummy";
import { UserProfileContainer, IntroContainer, ProfilePicSection, ProfileInfoSection, PointsButton, ChangeProfileSection } from "./Profile.styles";
import useMember from "../../hooks/memberHook";

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
    {profileModalState === false ? null : <ProfileEditModal />}
    <ProfilePicSection>
      <img src={profilePic? profilePic: "base_profile.jpg"} className="rounded-full h-32"></img>
    </ProfilePicSection>
    <ProfileInfoSection>
      {nickname}
      <PointsButton>
        {points}pts
      </PointsButton>
    </ProfileInfoSection>
    <ChangeProfileSection>
    <FullRoundedButton onClick={showProfileModal} >프로필수정</FullRoundedButton>
    </ChangeProfileSection>
    <IntroContainer>{intro}</IntroContainer>
  </UserProfileContainer>);
}
