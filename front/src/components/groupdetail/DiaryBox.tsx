import React from "react";

import { DiaryDetail, DiaryHeader, DiaryContent } from "./Diaries.styles";
import DiaryComment from "./DiaryComment";

export default function DiaryBox() {
  const photo = 1;
  return (
    <DiaryDetail>
      <DiaryHeader>
        <img src="{user.thumbnail}" alt="프로필" />
        <div>
          <h2>멤버 1</h2>
          <h3>2023. 5. 2. 12:20:00</h3>
        </div>
      </DiaryHeader>
      <DiaryContent>
        {photo ? (
          <div>
            <img src="{user.thumbnail}" alt="일기 사진입니다." />
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <p style={{ marginTop: 0 }}>오늘 나는 봉사활동을 하였다.</p>
        </div>
      </DiaryContent>
      <DiaryComment />
    </DiaryDetail>
  );
}
