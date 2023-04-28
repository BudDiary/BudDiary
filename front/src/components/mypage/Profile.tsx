import React from "react";
import Swal from 'sweetalert2';
import { FullRoundedButton } from "../button/Button.styles";

export default function Profile() {
  const showProfileEditModal = () => {
    Swal.fire({
      title: `초대 성공`,
      icon: 'success',
      // showConfirmButton: false,
    });
  }
  return (<div>프로필~!!
    <FullRoundedButton>지금 내가 가진 포인트</FullRoundedButton>
    <FullRoundedButton onClick={showProfileEditModal}>프로필수정</FullRoundedButton>
  </div>);
}
