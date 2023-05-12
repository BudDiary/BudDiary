import React, { useState, useEffect } from "react";
import Addpicture from "../../components/write/Addpicture";
import Pictures from "../../components/write/Pictures";
import Checkbox from "@mui/joy/Checkbox";
import Content from "../../components/write/Content";
import { getMyClubListApi } from "../../apis/clubApi";
import useMember from "../../hooks/memberHook";
import {
  PageContainer,
  SubNavContainer,
} from "../../components/common/Page.styles";
import { SurveyAgainButton } from "../../components/common/Button.styles";
import { postSentimentApi, postTodayDiaryApi } from "../../apis/diaryApi";
import GroupSelect from "../../components/write/GroupSelect";
import navimg from "../../assets/subnav/WirteDiary.jpg";
import TypeIt from "typeit-react";
import { useNavigate } from "react-router-dom";
import { ContentBox, StageContainer } from "./WritePage.styles";

// asdadasd

interface GroupData {
  clubUuid: string;
  thumbnailUrl: string;
  clubName: string;
}

export default function WritePage() {
  const navigate = useNavigate();

  const { memberData } = useMember();
  const username = memberData.username;
  const nickname = memberData.nickname;
  const [content, setContent] = useState<string>("");
  const [originFiles, setOriginFiles] = useState<File[]>([]);
  const [selectGroup, setSelectGroup] = useState<string[]>([]);
  const [mygroup, setMygroup] = useState<GroupData[]>([]);
  const [personalChecked, setPersonalChecked] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(0);

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

  useEffect(
    () => console.log(selectGroup, "this is selectGroup"),
    [selectGroup]
  );

  const handleChange = () => {
    setPersonalChecked(!personalChecked);
  };

  const handleSelectGroupChange = (newSelectGroup: string[]) => {
    setSelectGroup(newSelectGroup);
  };

  const sendData = async () => {
    postSentimentApi({'content' : content})
    
    const data = {
      text: content,
      fileList: originFiles,
      clubList: selectGroup,
      isPersonal: personalChecked,
      memberUsername: username,
    };


    // await postTodayDiaryApi(data);
    setStage(1);
  };

  const backSpace = () => {
    setStage(0);
  };

  return (
    <>
      <SubNavContainer img={navimg}>
        <TypeIt
          options={{
            strings: ["일기 작성하기"],
            cursor: false,
            breakLines: false,
            speed: 100,
          }}
        />
      </SubNavContainer>

      {stage === 0 ? (
        <PageContainer>
          <span className="flex h-full">
            <Addpicture
              originFiles={originFiles}
              setOriginFiles={setOriginFiles}
            />
            <Pictures
              originFiles={originFiles}
              setOriginFiles={setOriginFiles}
            />
          </span>
          <div className="flex justify-evenly items-center mb-4 flex-col sm:flex-row">
            <GroupSelect
              mygroup={mygroup}
              selectGroup={selectGroup}
              onChange={handleSelectGroupChange}
            />
            <Checkbox
              label="개인일기에 저장"
              size="lg"
              defaultChecked
              onChange={handleChange}
            />
          </div>
          <Content setContent={setContent} content={content} />
          <div className="w-full flex justify-center my-8">
            <SurveyAgainButton
              disabled={content === "" ? true : false}
              onClick={sendData}
            >
              다음
            </SurveyAgainButton>
          </div>
        </PageContainer>
      ) : (
        <StageContainer>
          <div>스티커 들어올 자리</div>
          <ContentBox>{content}</ContentBox>
          <div className="flex justify-evenly">
            <button
              className="bg-gray-300 text-white w-[120px] h-[45px] rounded-md"
              onClick={backSpace}
            >
              이전
            </button>
            <button className="bg-bud-green text-white w-[120px] h-[45px] rounded-md">
              완료
            </button>
          </div>
        </StageContainer>
      )}
    </>
  );
}
