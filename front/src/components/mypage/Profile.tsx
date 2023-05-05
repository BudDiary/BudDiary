import React, { useState } from "react";
import Swal from 'sweetalert2';
import { FullRoundedButton } from "../common/Button.styles";
import ProfileEditModal from "./ProfileEditModal";
import { BsCoin } from 'react-icons/bs'
import { userdummy } from "./userdummy";
import { UserProfileContainer, IntroContainer, ProfilePicSection, ProfileInfoSection, PointsButton, ChangeProfileSection } from "./Profile.styles";

export default function Profile() {
  const [profileModalState, setProfileModalState] = useState(false);
  const showProfileModal = () => {
    setProfileModalState(true);
  }
  return (<UserProfileContainer>
    {profileModalState === false ? null : <ProfileEditModal />}
    <ProfilePicSection>
      <img src={userdummy.profilePic} className="rounded-full h-32"></img>
    </ProfilePicSection>
    <ProfileInfoSection>
      {userdummy.nickname}
      <PointsButton>
        {userdummy.points}pts
      </PointsButton>
    </ProfileInfoSection>
    <ChangeProfileSection>
    <FullRoundedButton onClick={showProfileModal} >프로필수정</FullRoundedButton>
    </ChangeProfileSection>
    <IntroContainer>{userdummy.intro}</IntroContainer>
  </UserProfileContainer>);
}
