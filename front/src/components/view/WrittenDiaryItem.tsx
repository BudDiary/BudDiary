import React from 'react'

interface Props {
  type: string;
}

export default function WrittenDiaryItem(diary: Props) {
  return (
    <>
      <div>
        {diary.type}
      </div>
    </>
  )
}
