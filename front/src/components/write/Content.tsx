import React from 'react';
interface Props {
  setContent: React.Dispatch<React.SetStateAction<string>>;
}
export default function Content({ setContent }: Props) {
  return (
    <div className='bg-green-700'>
      <textarea
        rows={10}
        placeholder=''
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
