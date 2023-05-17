import React, { useState, useEffect } from "react";
import { CalendarContainer, DateControlContainer, ChangeDateButton, TodayMonthYear, CalendarSection, WeekDaySection } from "./Calendar.styles";
import DateItem from "./DateItem";

export default function Calendar() {
  const [todayDate, setTodayDate] = useState<Date>(new Date());
  const [clickedDate, setClickedDate] = useState<Date>();
  const changeMonth = (payload: number) => {
    const date = new Date(todayDate.getTime());
    date.setMonth(date.getMonth() + payload);
    setTodayDate(date);
  }
  // 요일들
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  
  // 해당 달의 날짜들 리스트
  const daysInMonth = (todayDate: Date) => {
    const nowYear = todayDate.getFullYear();
    const nowMonth = todayDate.getMonth();
    // 그 달의 1일이 무슨요일인지
    const firstWeekday = new Date(nowYear, nowMonth, 1).getDay();
    // 그 달의 마지막날의 무슨요일인지
    const lastWeekday = new Date(nowYear, nowMonth + 1, 0).getDay();
    // 전 달, 이번달의 마지막날짜
    const result: Date[] = [];
    const prevMonthEnd = new Date(nowYear, nowMonth, 0).getDate();
    const nowMonthEnd = new Date(nowYear, nowMonth + 1, 0).getDate();
  
    for (let i = firstWeekday - 1; i >= 0; i--) {
      result.push(new Date(nowYear, nowMonth - 1, prevMonthEnd - i));
    }
  
    for (let i = 1; i <= nowMonthEnd; i++) {
      result.push(new Date(nowYear, nowMonth, i));
    }
  
    for (let i = 1; i < 7 - lastWeekday; i++) {
      result.push(new Date(nowYear, nowMonth + 1, i));
    }
  
    return result;
  };
  const [allDaysInMonth, setAllDaysInMonth] = useState<Date[]>([]);


  useEffect(() => {
    setAllDaysInMonth(daysInMonth(todayDate));
  }, [todayDate]);
  


  return (
    <CalendarContainer>
      <DateControlContainer>
        <ChangeDateButton onClick={() => changeMonth(-1)}>{`<`}</ChangeDateButton>
        <TodayMonthYear>{`${todayDate.getFullYear()}.${(todayDate.getMonth() + 1).toString().padStart(2, '0')}`}</TodayMonthYear>
        <ChangeDateButton onClick={() => changeMonth(+1)}>{`>`}</ChangeDateButton>
      </DateControlContainer>
      <CalendarSection>
        {weekDays.map((weekDay) => {
          return <WeekDaySection key={weekDay} isSaturday={weekDay === "토"} isSunday={weekDay === "일"}>{weekDay}</WeekDaySection>;
        })}
        {allDaysInMonth.map((day: Date) => {
        return (
          <DateItem 
          key={day.getTime()}
          day={day}
          todayDate={todayDate}
          setTodayDate={setTodayDate}
          clickedDate={clickedDate}
          setClickedDate={setClickedDate}/>
        );
      })}
      </CalendarSection>
    </CalendarContainer>
  )
}
