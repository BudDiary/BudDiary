import React from "react";
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
  const username = memberData.username;
  const clubType = clubInfo?.clubType;

  return (
    <GroupList style={style}>
      <p>{clubInfo?.clubName}</p>
      <img src={clubInfo?.thumbnailUrl ?? ""} alt="그룹 섬네일" />
      {clubType !== "DOUBLE" && clubType === "PLURAL" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <ClubList>멤버 {memberList?.length}</ClubList>
          <BasicButton>초대하기</BasicButton>
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
  );
}
