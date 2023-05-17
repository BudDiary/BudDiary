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

interface Props {
  id: number;
  clubName: string | null;
  clubUuid: string | null;
  nickname: string;
  type: string;
  username: string;
  // alarmList: any[];
}

export default function AlarmSSE(props: Props) {
  const navigate = useNavigate();
  const { id, clubName, clubUuid, nickname, type, username } = props;
  const handleDeleteAlarm = async () => {
    await deleteSSEAlarmsApi(id);
  };
  const handleAcceptAlarm = async () => {
    const response = await postDoubleClubApi(username);
    if (response) {
      deleteSSEAlarmsApi(id);
    }
    navigate(`/group/${response.uuid}`);
  };

  return (
    <OneAlarmContainer id="my-component">
      <NickNameSection>
        {nickname}님의
        {type === "DOUBLE_INVITE" ? " 랜덤일기 " : ` ${clubName} 그룹일기 `}
        초대:
      </NickNameSection>
      <ButtonsContainer>
        <AcceptInvitationButton onClick={handleAcceptAlarm}>
          수락하기
        </AcceptInvitationButton>
        <DeclineInvitationButton onClick={handleDeleteAlarm}>
          거절하기
        </DeclineInvitationButton>
      </ButtonsContainer>
    </OneAlarmContainer>
  );
}
