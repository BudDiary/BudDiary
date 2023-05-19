import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  OneAlarmContainer,
  NickNameSection,
  ButtonsContainer,
} from "./AlarmSSE.styles";
import {
  AcceptInvitationButton,
  DeclineInvitationButton,
} from "../common/Button.styles";
import { deleteSSEAlarmsApi } from "../../apis/noticeApi";
import { postDoubleClubApi } from "../../apis/clubApi";
import Swal from "sweetalert2";

interface Alarm {
  id: number;
  clubName: string | null;
  clubUuid: string | null;
  nickname: string;
  type: string;
  username: string;
}

interface Props {
  alarm: Alarm;
  onDeleteAlarm: (alarmId: number) => void;
}


export default function AlarmSSE(props: Props) {
  const navigate = useNavigate();
  const { alarm, onDeleteAlarm } = props;
  const handleDeleteAlarm = async () => {
    try {
      await deleteSSEAlarmsApi(alarm.id);
      onDeleteAlarm(alarm.id);
    } catch (error) {
      console.error(error);
    }
  };

  
  const handleAcceptAlarm = async () => {
    try {
      const response = await postDoubleClubApi(alarm.username);
      console.log(response, '수락 확인')
      if (response) {
        await deleteSSEAlarmsApi(alarm.id);
        handleReadAlarm()
      }
      navigate(`/group/${response.uuid}`);
      Swal.fire({
        text: '새로운 랜덤일기가 시작되었어요!🎉',
      });
    } catch (error) {
      // await deleteSSEAlarmsApi(alarm.id);
      handleReadAlarm()

      console.error(error);
    }
  };
  const goToClub = () => {
    navigate(`/group/${alarm.clubUuid}`);
    handleDeleteAlarm(); // Update: Call handleDeleteAlarm instead of deleteSSEAlarmsApi directly
  };

  const handleReadAlarm = () => {
    handleDeleteAlarm(); // Update: Call handleDeleteAlarm instead of deleteSSEAlarmsApi directly
  };

  return (
    <OneAlarmContainer id="my-component">
      <NickNameSection>
        {alarm.nickname}님의
        {alarm.type === 'DOUBLE_INVITE'
          ? ' 랜덤일기 초대:'
          : ` ${alarm.clubName} 그룹일기 새글:`}
      </NickNameSection>
      <ButtonsContainer>
        {alarm.type === 'DOUBLE_INVITE' ? (
          <AcceptInvitationButton onClick={handleAcceptAlarm}>
            수락하기
          </AcceptInvitationButton>
        ) : (
          <AcceptInvitationButton onClick={goToClub}>
            보러가기
          </AcceptInvitationButton>
        )}
        <DeclineInvitationButton onClick={handleReadAlarm}>
          {alarm.type === 'DOUBLE_INVITE' ? ' 거절하기' : '읽음'}
        </DeclineInvitationButton>
      </ButtonsContainer>
    </OneAlarmContainer>
  );
}