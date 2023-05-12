import React, { useState, useEffect, useRef } from "react";
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
import { postTodayDiaryApi } from "../../apis/diaryApi";
import GroupSelect from "../../components/write/GroupSelect";
// import GroupSelect from '../../components/write/GroupSelect'
interface GroupData {
  clubUuid: string;
  thumbnailUrl: string;
  clubName: string;
}


export default function WritePage() {
  const { memberData } = useMember();
  const username = memberData.username;
  const nickname = memberData.nickname;
  const [content, setContent] = useState<string>("");
  const [originFiles, setOriginFiles] = useState<File[]>([]);
  const [selectGroup, setSelectGroup] = useState<string[]>([]);
  
  const [mygroup, setMygroup] = useState<GroupData[]>([]);
  useEffect(() => {
    async function fetchMyGroup() {
      const myGroupObject = await getMyClubListApi(username);
      const pluralList = myGroupObject.pluralList;
      const doubleList = myGroupObject.doubleList;
      const combinedList = [...pluralList, ...doubleList];
      setMygroup(combinedList);
    }
    fetchMyGroup();
  }, [username]);
  useEffect (() => 
  console.log(selectGroup, 'this is selectGroup')
  , [selectGroup])

  const handleSelectGroupChange = (newSelectGroup: string[]) => {
    setSelectGroup(newSelectGroup);
  };
  const goData = () => {
    // console.log(content);
    // console.log(originFiles);
    const data = {
      text: content,
      fileList: originFiles,
      clubList: selectGroup,
      isPersonal: true,
      // stickerList: [],
      memberUsername: username,
    };
    console.log(data, "RequestBody", mygroup);
    postTodayDiaryApi(data)
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
        <GroupSelect mygroup={mygroup} selectGroup={selectGroup} onChange={handleSelectGroupChange} />

        {/* <div className="w-full flex justify-center mb-8">
        <CustomMultiSelect onChange={consolelog}>
  {mygroup.map((group: GroupData, index: number) => (
    <StyledOption key={index} value={group.clubUuid}>
      {group.clubName}
    </StyledOption>
  ))}
</CustomMultiSelect>
        </div> */}
        <Content setContent={setContent} />
        <div className="w-full flex justify-center my-8">
          <SurveyAgainButton onClick={goData}>등록</SurveyAgainButton>
        </div>
      </PageContainer>
    </>
  );
}
