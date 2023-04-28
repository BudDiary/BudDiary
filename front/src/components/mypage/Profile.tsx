import React, { useState } from "react";
import Swal from 'sweetalert2';
import { FullRoundedButton } from "../common/Button.styles";
import ProfileEditModal from "./ProfileEditModal";
// interface Props {
//   profileModalState: false;
// }

export default function Profile() {
  const [profileModalState, setProfileModalState] = useState(false);
  const showProfileModal = () => {
    setProfileModalState(true);
  }
  return (<div>프로필~!!
    {profileModalState === false ? null : <ProfileEditModal />}
    <FullRoundedButton>지금 내가 가진 포인트</FullRoundedButton>
    <FullRoundedButton onClick={showProfileModal} >프로필수정</FullRoundedButton>
  </div>);
}
