import React, { useState } from "react";
import Swal from 'sweetalert2';
import { FullRoundedButton } from "../common/Button.styles";
import ProfileEditModal from "./ProfileEditModal";
import { BsCoin } from 'react-icons/bs'
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
    <FullRoundedButton><BsCoin /></FullRoundedButton>
    <FullRoundedButton onClick={showProfileModal} >프로필수정</FullRoundedButton>
  </div>);
}
