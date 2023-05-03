import React from "react";
import { GroupList, MemberList } from "./GroupInfo.styles";
import { BasicButton } from "./Diaries.styles";
import groupData from "./groupInfo.json";

export default function GroupInfo() {
  const { thumbnail, members } = groupData;

  return (
    <GroupList>
      <img src={thumbnail} alt="그룹 섬네일" />
      <p style={{ fontWeight: "bold" }}>그룹 이름입니다</p>
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
            <p style={{ fontWeight: "bold" }}>{member.name}</p>
          </div>
        ))}
      </MemberList>
    </GroupList>
  );
}
