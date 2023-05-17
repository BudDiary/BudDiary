import React from "react";

interface Props {
  type: string;
  club: string | null;
  pics: any;
  content: string;
  date: any;
  negative: number;
  positive: number;
}

export default function WrittenDiaryItem(diary: Props) {
  return (
    <>
      <div className="border border-gray-300 rounded-lg my-2 min-h-[400px] p-4">
        <div>{diary.type}</div>
        <div>{diary.club}</div>
        <div>{diary.pics}</div>
        <div>{diary.content}</div>
        <div>{diary.date}</div>
        <div>{diary.negative}</div>
        <div>{diary.positive}</div>
      </div>
    </>
  );
}
