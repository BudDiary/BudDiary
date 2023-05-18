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

interface Props {
  id: number;
  clubName: string | null;
  clubUuid: string | null;
  nickname: string;
  type: string;
  username: string;
}

export default function AlarmSSE(props: Props) {
  const navigate = useNavigate();
  const { id, clubName, clubUuid, nickname, type, username } = props;
  const handleDeleteAlarm = async () => {
    const delRes = await deleteSSEAlarmsApi(id);
    console.log(delRes, 'this is delRes')

    if (delRes === 204) {
      Swal.fire({
        text: "랜덤일기 신청을 거절했습니다.",
      });
    }
  };
  const handleAcceptAlarm = async () => {
    const response = await postDoubleClubApi(username);
    if (response) {
      deleteSSEAlarmsApi(id);
    }
    navigate(`/group/${response.uuid}`);
    Swal.fire({
      text: "새로운 랜덤일기가 시작되었어요!🎉",
    });
  };
  const goToClub = () => {
    navigate(`/group/${clubUuid}`);
    deleteSSEAlarmsApi(id);
  };
  return (
    <OneAlarmContainer id="my-component">
      <NickNameSection>
        {nickname}님의
        {type === "DOUBLE_INVITE"
          ? " 랜덤일기 초대:"
          : ` ${clubName} 그룹일기 새글:`}
      </NickNameSection>
      <ButtonsContainer>
        {type === "DOUBLE_INVITE" ? (
          <AcceptInvitationButton onClick={handleAcceptAlarm}>
            수락하기
          </AcceptInvitationButton>
        ) : (
          <AcceptInvitationButton onClick={goToClub}>
            보러가기
          </AcceptInvitationButton>
        )}
        <DeclineInvitationButton onClick={handleDeleteAlarm}>
          {type === "DOUBLE_INVITE" ? " 거절하기" : "읽음"}
        </DeclineInvitationButton>
      </ButtonsContainer>
    </OneAlarmContainer>
  );
}
