import React from "react";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  content: string;
}

export default function Content({ setContent, content }: Props) {
  return (
    <div className="border w-full mx-4">
      <TextareaAutosize
        style={{ width: "100%", fontSize: "16px" }}
        minRows={8}
        placeholder="일기를 작성해 보세요 "
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
    </div>
  );
}
