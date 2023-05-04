import React from "react";
import { GroupList, MemberList } from "./GroupInfo.styles";
import { BasicButton } from "./Diaries.styles";
// 나중에 axios 요청
import groupData from "./groupInfo.json";

export default function GroupInfo() {
  const { thumbnailUrl, members, clubName } = groupData;

  return (
    <GroupList>
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
