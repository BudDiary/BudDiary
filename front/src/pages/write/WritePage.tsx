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
import { SurveyAgainButton } from "../../components/common/Button.styles";

interface Props {
  onFilesChanged: (files: File[]) => void;
}

export default function WritePage() {
  const { memberData } = useMember();
  const username = memberData.username;
  const nickname = memberData.nickname;
  const [content, setContent] = useState<string>("");
  const [originFiles, setOriginFiles] = useState<File[]>([]);
  const [selectGroup, setSelectGroup] = useState<string[]>([]);
  const mygroup = getMyClubListApi(username);

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

  const goData = () => {
    console.log(content);
    console.log(originFiles);
    const data = {
      text: content,
      originFiles: originFiles,
      clubList: selectGroup,
      isPersonal: true,
      stickerList: [],
      memberUsername: nickname,
    };

    console.log(data, "RequestBody", mygroup);
  };

  const consolelog = (e: any) => {
    if (selectGroup.includes(e.target.textContent)) {
      const idx = selectGroup.indexOf(e.target.textContent);
      selectGroup.splice(idx, 1);
      console.log("취소함", selectGroup);
    } else {
      selectGroup.push(e.target.textContent);
      console.log("추가함", selectGroup);
    }
  };
  return (
    <>
      <SubNavContainer>일기 작성하기</SubNavContainer>

      <PageContainer>
        <span className="flex h-full">
          <Addpicture
            originFiles={originFiles}
            setOriginFiles={setOriginFiles}
          />
          <Pictures originFiles={originFiles} setOriginFiles={setOriginFiles} />
        </span>
        <div className="w-full flex justify-center mb-8">
          <CustomMultiSelect onChange={(e: any) => consolelog(e)}>
            <StyledOption value={1}>개인일기</StyledOption>
            <StyledOption value={2}>그룹일기1</StyledOption>
            <StyledOption value={3}>그룹일기2</StyledOption>
            <StyledOption value={4}>그룹일기3</StyledOption>
            <StyledOption value={5}>그룹일기4</StyledOption>
          </CustomMultiSelect>
        </div>

        <Content setContent={setContent} />
        <div className="w-full flex justify-center my-8">
          <SurveyAgainButton onClick={goData}>등록</SurveyAgainButton>
        </div>
      </PageContainer>
    </>
  );
}
