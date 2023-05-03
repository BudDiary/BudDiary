import React from 'react';
interface Props {
  setContent: React.Dispatch<React.SetStateAction<string>>;
}
export default function Content({ setContent }: Props) {
  return (
    <div>
      <textarea
      style={{position: "absolute", top: "20%", left: "20%",  width: "50%", height: "50%", resize: "both"}}
      // style={{height: "200px", width: "500px", resize: "both"}}
        rows={10}
        placeholder=''
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
