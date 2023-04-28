import React, { useState } from "react";
import Addpicture from "../../components/write/Addpicture";
import Pictures from "../../components/write/Pictures";
import Content from "../../components/write/Content";

import { PostingTabType } from "../../types/write";
import {SubNavContainer } from "../mypage/MypagePage.styles"
import { PageContainer } from "../../components/common/Page.styles";

export default function WritePage() {
  const [tab, setTab] = useState<PostingTabType>("SELECT_IMAGE");
  const [content, setContent] = useState<string>('');
  const [originFiles, setOriginFiles] = useState<File[]>([]);
  return (
    <>
        <SubNavContainer>write</SubNavContainer>
        <Addpicture
          setTab={setTab}
          originFiles={originFiles}
          setOriginFiles={setOriginFiles}
          />
          <Pictures originFiles={originFiles} />
          <Content setContent={setContent} />
          </>
  );
}
