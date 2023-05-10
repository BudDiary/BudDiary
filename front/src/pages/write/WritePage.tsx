import React, { useState } from "react";
import Addpicture from "../../components/write/Addpicture";
import Pictures from "../../components/write/Pictures";
import Content from "../../components/write/Content";
import { PostingTabType } from "../../types/write";
import {
  PageContainer,
  SubNavContainer,
} from "../../components/common/Page.styles";

interface Props {
  onFilesChanged: (files: File[]) => void;
}

export default function WritePage() {
  const [content, setContent] = useState<string>("");
  const [originFiles, setOriginFiles] = useState<File[]>([]);
  const goData = () => {
    console.log(content);
    console.log(originFiles);
  };
  return (
    <>
      <SubNavContainer>일기 작성하기</SubNavContainer>
      <PageContainer>
        <span className="flex h-80">
          <Addpicture
            originFiles={originFiles}
            setOriginFiles={setOriginFiles}
          />
          <Pictures originFiles={originFiles} setOriginFiles={setOriginFiles} />
        </span>
        <Content setContent={setContent} />
        <button onClick={goData}>등록</button>
      </PageContainer>
    </>
  );
}
