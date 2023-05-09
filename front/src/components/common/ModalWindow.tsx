import React from 'react'
import { useEffect, useRef, useState } from 'react';
import NewGroupDiaryModal from '../group/NewGroupDiaryModal';
import ProfileEditModal from '../mypage/ProfileEditModal';
interface Props {
    page: number;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
export default function ModalWindow({ page, setModalOpen }: Props) {
	const closeModal = () => {
		setModalOpen(false);
    }
  return (
    <>
    {(page === 1) && (<NewGroupDiaryModal closeModal={closeModal}/>)}
    {(page === 2) && (<ProfileEditModal />)}
    </>
    

  )

}