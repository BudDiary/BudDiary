import React from "react";
import { GroupList, MemberList, ClubList } from "./GroupInfo.styles";
import { BasicButton } from "./Diaries.styles";
// import groupData from "./groupInfo.json";
import { Member, Info } from "../../types/group";
import { MouseWheel } from "../home/ASection.styles";
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
  return (
    <GroupList style={style}>
      <img src={clubInfo?.thumbnailUrl ?? ""} alt="그룹 섬네일" />
      <p>{clubInfo?.clubName}</p>
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

      <MemberList>
        {memberList?.map((member) => (
          <div key={member.id}>
            <img src={member.profilePath ?? ""} alt="프로필" />
            <p>{member.nickname}</p>
          </div>
        ))}
      </MemberList>
    </GroupList>
  );
}
