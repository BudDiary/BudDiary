import React from "react";
import diaryData from "./diaryData.json";
import { DiaryDetail, DiaryHeader, DiaryContent } from "./Diaries.styles";
import DiaryComment from "./DiaryComment";

export default function DiaryBox() {
  return (
    <>
      {diaryData.map((diary) => (
        <DiaryDetail key={diary.id}>
          <DiaryHeader>
            <img src={diary.user_thumbnail} alt="프로필" />
            <div>
              <h2>{diary.user_name}</h2>
              <h3>{diary.user_updated_at}</h3>
            </div>
          </DiaryHeader>
          <DiaryContent>
            {diary.thumbnail ? (
              <div>
                <img src={diary.thumbnail} alt="일기 사진입니다." />
              </div>
            ) : null}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <p style={{ marginTop: 0 }}>{diary.content}</p>
            </div>
          </DiaryContent>
          <DiaryComment key={diary.id} diaryId={diary.id} />
        </DiaryDetail>
      ))}
    </>
  );
}
