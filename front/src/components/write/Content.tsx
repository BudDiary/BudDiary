import React from "react";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  setContent: React.Dispatch<React.SetStateAction<string>>;
}
export default function Content({ setContent }: Props) {
  return (
    <div>
      <TextareaAutosize
        style={{ width: "100%", fontSize: "16px" }}
        minRows={8}
        defaultValue="일기를 작성해 보세요"
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
