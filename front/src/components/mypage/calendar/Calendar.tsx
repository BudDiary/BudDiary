import React, { useState } from "react";
import DateBox from "../DateBox";
import { CalendarContainer, DateControlContainer, ChangeDateButton, TodayMonthYear, CalendarSection, WeekDaySection } from "./Calendar.styles";



export default function Calendar() {
  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [clickedDate, setClickedDate] = useState<Date>();
  const changeMonth = (payload: number) => {
    const date = new Date(nowDate.getTime());
    date.setMonth(date.getMonth() + payload);
    setNowDate(date);
  }
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <CalendarContainer>
      <DateControlContainer>
        <ChangeDateButton onClick={() => changeMonth(-1)}>{`<`}</ChangeDateButton>
        <TodayMonthYear>{`${nowDate.getFullYear()}년 ${nowDate.getMonth() + 1}월`}</TodayMonthYear>
        <ChangeDateButton onClick={() => changeMonth(+1)}>{`>`}</ChangeDateButton>
      </DateControlContainer>
      <CalendarSection>
        {weeks.map((week) => {
          return <WeekDaySection>{week}</WeekDaySection>;
        })}
        
      </CalendarSection>
      <DateBox
        nowDate={nowDate}
        setNowDate={setNowDate}
        clickedDate={clickedDate}
        setClickedDate={setClickedDate}
      />
    </CalendarContainer>
  )
}
