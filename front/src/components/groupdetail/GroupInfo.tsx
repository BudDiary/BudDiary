import React from "react";
import { GroupList } from "./GroupInfo.styles";
import { BasicButton } from "./Diaries.styles";
export default function GroupInfo() {
  return (
    <GroupList>
      <img src="group.thumbnail" alt="그룹 섬네일" />
      <div>
        <span>멤버 4</span>
        <BasicButton>초대하기</BasicButton>
      </div>
      <div>
        <img src="user.thumbnail" alt="프로필" />
        <p style={{ fontWeight: "bold" }}>김준영</p>
      </div>
      <div>
        <img src="user.thumbnail" alt="프로필" />
        <p style={{ fontWeight: "bold" }}>김지오</p>
      </div>
      <div>
        <img src="user.thumbnail" alt="프로필" />
        <p style={{ fontWeight: "bold" }}>문여경</p>
      </div>
      <div>
        <img src="user.thumbnail" alt="프로필" />
        <p style={{ fontWeight: "bold" }}>문영식</p>
      </div>
    </GroupList>
  );
}
