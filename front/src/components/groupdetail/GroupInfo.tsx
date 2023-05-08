import React from "react";
import { GroupList, MemberList } from "./GroupInfo.styles";
import { BasicButton } from "./Diaries.styles";
import groupData from "./groupInfo.json";

interface GroupInfoProps {
  style?: React.CSSProperties;
}

export default function GroupInfo({ style }: GroupInfoProps) {
  const { thumbnailUrl, members, clubName } = groupData;

  return (
    <GroupList style={style}>
      <img src={thumbnailUrl} alt="그룹 섬네일" />
      <p style={{ fontWeight: "bold" }}>{clubName}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <span style={{ fontWeight: "bold" }}>멤버 {members.length}</span>
        <BasicButton>초대하기</BasicButton>
      </div>

      <MemberList>
        {members.map((member) => (
          <div key={member.id}>
            <img src={member.thumbnail} alt="프로필" />
            <p style={{ fontWeight: "bold" }}>{member.nickname}</p>
          </div>
        ))}
      </MemberList>
    </GroupList>
  );
}
