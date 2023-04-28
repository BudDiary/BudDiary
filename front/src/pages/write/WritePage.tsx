import React, { useState } from 'react';
import Addpicture from "../../components/write/Addpicture";

import { PostingTabType } from "../../types/write";

export default function WritePage() {
  const [tab, setTab] = useState<PostingTabType>('SELECT_IMAGE');
  const [originFiles, setOriginFiles] = useState<File[]>([]);
  return <div>
    {tab === 'SELECT_IMAGE' && (
      <Addpicture setTab={setTab} originFiles={originFiles} setOriginFiles={setOriginFiles} />
    )}
  </div>;
}
