import React from "react";
import { MyDiaryCalendarContainer, MyPageContainer, MyProfileInfoContainer } from "./MypagePage.styles";
import Profile from "../../components/mypage/Profile";
import Calendar from "../../components/mypage/Calendar";
import Stat from "../../components/mypage/Stat";
import { PageContainer } from "../../components/common/Page.styles";


export default function MypagePage() {
  return (
    <>
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
