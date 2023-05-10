import React, { useState } from "react";
import Addpicture from "../../components/write/Addpicture";
import Pictures from "../../components/write/Pictures";
import Content from "../../components/write/Content";
import Select, { SelectProps } from "@mui/base/Select";
import { getMyClubListApi } from "../../apis/clubApi";
import { PostingTabType } from "../../types/write";
import useMember from "../../hooks/memberHook";
import {
  PageContainer,
  SubNavContainer,
} from "../../components/common/Page.styles";
import {
  StyledOption,
  StyledButton,
  StyledListbox,
  StyledPopper,
} from "./WritePage.styles";

interface Props {
  onFilesChanged: (files: File[]) => void;
}

export default function WritePage() {
  const { memberData } = useMember();
  const username = memberData.username;
  const [content, setContent] = useState<string>("");
  const [originFiles, setOriginFiles] = useState<File[]>([]);
  const [selectGroup, setSelectGroup] = useState<string[]>([]);

  const CustomMultiSelect = React.forwardRef(function CustomMultiSelect(
    props: SelectProps<number, true>,
    ref: React.ForwardedRef<any>
  ) {
    const slots: SelectProps<number, true>["slots"] = {
      root: StyledButton,
      listbox: StyledListbox,
      popper: StyledPopper,
      ...props.slots,
    };

    return <Select {...props} multiple ref={ref} slots={slots} />;
  });

  const goData = async () => {
    console.log(content);
    console.log(originFiles);

    const mygroup = await getMyClubListApi(username);

    console.log(mygroup, "내그룹");
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
        <CustomMultiSelect>
          <StyledOption value={1}>개인일기</StyledOption>
          <StyledOption value={2}>그룹일기1</StyledOption>
          <StyledOption value={3}>그룹일기2</StyledOption>
          <StyledOption value={4}>그룹일기3</StyledOption>
          <StyledOption value={5}>그룹일기4</StyledOption>
        </CustomMultiSelect>

        <Content setContent={setContent} />
        <button onClick={goData}>등록</button>
      </PageContainer>
    </>
  );
}
