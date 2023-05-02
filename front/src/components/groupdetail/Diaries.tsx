import React from "react";
import { WideButton } from "./Diaries.styles";

import DiaryBox from "./DiaryBox";
export default function Diaries() {
  return (
    <div>
      <WideButton>+ 일기 작성하기</WideButton>
      <br />
      <DiaryBox />
    </div>
  );
}
