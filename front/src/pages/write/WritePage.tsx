import React, { useState } from "react";
import Addpicture from "../../components/write/Addpicture";
import Pictures from "../../components/write/Pictures";
import Content from "../../components/write/Content";

import { PostingTabType } from "../../types/write";

export default function WritePage() {
  const [tab, setTab] = useState<PostingTabType>("SELECT_IMAGE");
  const [content, setContent] = useState<string>('');
  const [originFiles, setOriginFiles] = useState<File[]>([]);
  return (
    <div>
        <Addpicture
          setTab={setTab}
          originFiles={originFiles}
          setOriginFiles={setOriginFiles}
        />
          <Pictures originFiles={originFiles} />
          <Content setContent={setContent} />
        
    </div>
  );
}
