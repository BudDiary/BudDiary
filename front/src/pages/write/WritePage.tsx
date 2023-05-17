import React, { useState, useEffect, useRef } from "react";
import Addpicture from "../../components/write/Addpicture";
import Pictures from "../../components/write/Pictures";
import Checkbox from "@mui/joy/Checkbox";
import Content from "../../components/write/Content";
import { getMyClubListApi } from "../../apis/clubApi";
import {
  PageContainer,
  SubNavContainer,
} from "../../components/common/Page.styles";
import { SurveyAgainButton } from "../../components/common/Button.styles";
import GroupSelect from "../../components/write/GroupSelect";
import navimg from "../../assets/subnav/WirteDiary.jpg";
import TypeIt from "typeit-react";
import useMember from "../../hooks/memberHook";
import Sticker from "./StickerPage";
import Swal from "sweetalert2";

// asdadasd

interface GroupData {
  clubUuid: string;
  thumbnailUrl: string;
  clubName: string;
  captainUsername: string | null;
  clubType: string;
}

export default function WritePage() {
  const { memberData } = useMember();
  const username = memberData.username;
  const [content, setContent] = useState<string>("");
  const [originFiles, setOriginFiles] = useState<File[]>([]);
  const [selectGroup, setSelectGroup] = useState<string[]>([]);
  const [mygroup, setMygroup] = useState<GroupData[]>([]);
  const [personalChecked, setPersonalChecked] = useState<boolean>(true);
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    async function fetchMyGroup() {
      const myGroupObject = await getMyClubListApi();
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

  const goToSticker = () => {
    if (personalChecked === false && selectGroup.length === 0) {
      Swal.fire({
        icon: "error",
        text: "일기를 작성할 위치를 고르지 않았어요.",
      });
    } else {
      setStage(1);
    }
  };

  return (
    <div className="font-hassam">
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
              onClick={goToSticker}
            >
              다음
            </SurveyAgainButton>
          </div>
        </PageContainer>
      ) : (
        <Sticker
          setStage={setStage}
          content={content}
          pics={originFiles}
          groups={selectGroup}
          personal={personalChecked}
        />
      )}
    </div>
  );
}
