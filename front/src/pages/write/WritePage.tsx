import React, { useState } from "react";
import Addpicture from "../../components/write/Addpicture";
import Pictures from "../../components/write/Pictures";
import Content from "../../components/write/Content";

import { PostingTabType } from "../../types/write";
import {SubNavContainer } from "../mypage/MypagePage.styles"
import { PageContainer } from "../../components/common/Page.styles";

interface Props {
  onFilesChanged: (files: File[]) => void;
}

export default function WritePage() {
  const [content, setContent] = useState<string>('');
  const [originFiles, setOriginFiles] = useState<File[]>([]);
  return (
    <>
      <SubNavContainer>write</SubNavContainer>
      <PageContainer>
        <span className="flex h-80">
        <Addpicture
          originFiles={originFiles}
          setOriginFiles={setOriginFiles}
          />
          <Pictures originFiles={originFiles}
          setOriginFiles={setOriginFiles}/>
          </span>
          <Content setContent={setContent} />
      </PageContainer>
    </>
  );
}
