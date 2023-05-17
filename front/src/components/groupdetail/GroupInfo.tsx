import React, { useState } from "react";
import {
  GroupList,
  MemberList,
  ClubList,
  MemberListInfo,
} from "./GroupInfo.styles";
import { BasicButton } from "./Diaries.styles";
import useMember from "../../hooks/memberHook";
import { Divider } from "@mui/material";
import { Member, Info } from "../../types/group";
import crown from "../../assets/group/crown.png";
import { InvitationModal } from "../kakaoinvitation/InvitationModal";

interface GroupInfoProps {
  clubInfo?: Info;
  memberList?: Member[];
  style?: React.CSSProperties;
}

export default function GroupInfo({
  clubInfo,
  memberList,
  style,
}: GroupInfoProps) {
  const { memberData } = useMember();
  const [showModal, setShowModal] = useState(false);
  const username = memberData.username;
  const clubType = clubInfo?.clubType;

  const handleToggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <GroupList style={style}>
        <p>{clubInfo?.clubName}</p>
        <img src={clubInfo?.thumbnailUrl ?? ""} alt="그룹 섬네일" />
        {clubType !== "DOUBLE" && clubType === "PLURAL" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ClubList>멤버 {memberList?.length}</ClubList>
            <BasicButton onClick={handleToggleModal}>초대하기</BasicButton>
          </div>
        ) : null}
        <Divider style={{ border: "solid 2px #BFDBFE", width: "100%" }} />
        <MemberList>
          {memberList?.map((member) => (
            <div key={member.id}>
              <img src={member.profilePath ?? ""} alt="프로필" />
              <MemberListInfo>
                {member.nickname}
                {member.username === clubInfo?.captainUsername ? (
                  <img
                    src={crown}
                    alt=""
                    style={{ border: "none", height: "20px", width: "20px" }}
                  />
                ) : (
                  ""
                )}
                <p>{member.username === username ? "  me" : ""}</p>
              </MemberListInfo>
            </div>
          ))}
        </MemberList>
      </GroupList>
      {showModal && (
        <InvitationModal clubInfo={clubInfo} onClose={handleCloseModal} />
      )}
    </>
  );
}
