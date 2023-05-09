import React from 'react';
import { DateItemContainer, DateTitle } from "./DateItem.styles";
import { useNavigate } from 'react-router-dom';

interface Props {
  day: Date;
  todayDate: Date;
  setTodayDate: React.Dispatch<React.SetStateAction<Date>>;
  clickedDate: Date | undefined;
  setClickedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}
export default function DateItem({
  day,
  todayDate,
  setTodayDate,
  clickedDate,
  setClickedDate,
  }: Props) {
  const navigate = useNavigate();
  const nowTime = new Date();

  const sameMonth = todayDate.getMonth() === day.getMonth();
  const sameDay =
    nowTime.getFullYear() === day.getFullYear() &&
    nowTime.getMonth() === day.getMonth() &&
    nowTime.getDate() === day.getDate();

  const clickDay: boolean = clickedDate
    ? clickedDate.getFullYear() === day.getFullYear() &&
      clickedDate.getMonth() === day.getMonth() &&
      clickedDate.getDate() === day.getDate()
    : false;
  
  // 과거인지아닌지
  const futureDay: boolean = 
  nowTime.getFullYear() < day.getFullYear() ||
  (nowTime.getFullYear() === day.getFullYear() && nowTime.getMonth() < day.getMonth()) ||
  (nowTime.getFullYear() === day.getFullYear() && nowTime.getMonth() === day.getMonth() && nowTime.getDate() < day.getDate());
  
  // 토요일, 일요일, 주중 구분
  const saturDay: boolean = 
  day.getDay() ===6 ? true: false;
  const sunDay: boolean = 
  day.getDay() ===0 ? true: false;


  const clickDate = () => {
    setClickedDate(day);
    navigate(`/view/diary/${day.getFullYear()}-${(day.getMonth()+1).toString().padStart(2, '0')}-${day.getDate().toString().padStart(2, '0')}`);
  };

  return (
    <DateItemContainer 
      onClick={() => clickDate()}
      sameDay={sameDay}
      clickDay={clickDay}
      futureDay={futureDay}
    >
      <DateTitle       
      sameMonth={sameMonth}
      sameDay={sameDay}
      futureDay={futureDay}
      saturDay = {saturDay}
      sunDay = {sunDay}
      >{day.getDate()}</DateTitle>
    </DateItemContainer>
  )
}
