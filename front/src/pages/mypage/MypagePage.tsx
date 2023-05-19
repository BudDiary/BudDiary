import React from "react";
import {
  MyDiaryCalendarContainer,
  MyPageContainer,
  MyProfileInfoContainer,
} from "./MypagePage.styles";

import Profile from "../../components/mypage/Profile";
import Calendar from "../../components/mypage/calendar/Calendar";
import Stat from "../../components/mypage/Stat";
import {
  PageContainer,
  SubNavContainer,
} from "../../components/common/Page.styles";
import navimg from "../../assets/subnav/MyPageDiary.jpg";
import TypeIt from "typeit-react";

export default function MypagePage() {
  return (
    <>
      <SubNavContainer img={navimg}>
        <TypeIt
          options={{
            strings: ["My Page"],
            cursor: false,
            breakLines: false,
            speed: 100,
          }}
        />
      </SubNavContainer>
      <PageContainer>
        <MyPageContainer>
          <MyProfileInfoContainer>
            <Profile />
          </MyProfileInfoContainer>
          <MyDiaryCalendarContainer>
            <Calendar />
          </MyDiaryCalendarContainer>
          <MyProfileInfoContainer>
            <Stat />
          </MyProfileInfoContainer>
        </MyPageContainer>
      </PageContainer>
    </>
  );
}
