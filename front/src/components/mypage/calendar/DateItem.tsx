import React, { useEffect, useState } from "react";
import { DateItemContainer, DateTitle } from "./DateItem.styles";
import { useNavigate } from "react-router-dom";
import { getDateDiaryListApi } from "../../../apis/diaryApi";
import excited from "../../../assets/excited.png";
import happy from "../../../assets/happy.png";
import normal from "../../../assets/normal.png";
import sad from "../../../assets/sad.png";
import crying from "../../../assets/crying.png";

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
  const [dateList, setDateList] = useState<string[]>([]);
  const [averagePositive, setAveragePositive] = useState<number>();
  const [averageNegative, setAverageNegative] = useState<number>();
  const nowTime = new Date();

  useEffect(() => {
    const date = `${day.getFullYear()}-${(day.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${day.getDate().toString().padStart(2, "0")}`;

    getDateDiaryListApi(date).then((res) => {
      if (res && res.length > 0) {
        const averagePositiveRate =
          res.reduce((sum: number, diary: any) => {
            return sum + diary.diaryInfo.positiveRate;
          }, 0) / res.length;

        const averageNegativeRate =
          res.reduce((sum: number, diary: any) => {
            return sum + diary.diaryInfo.negativeRate;
          }, 0) / res.length;

        setAveragePositive(averagePositiveRate);
        setAverageNegative(averageNegativeRate);
      }
    });
  }, [day]);

  const getFeelingRate = (negative: number, positive: number) => {
    const feelingRate = positive - negative;
    let image = "";

    if (feelingRate >= -100 && feelingRate < -60) {
      image = crying;
    } else if (feelingRate >= -60 && feelingRate < -20) {
      image = sad;
    } else if (feelingRate >= -20 && feelingRate < 20) {
      image = normal;
    } else if (feelingRate >= 20 && feelingRate < 60) {
      image = happy;
    } else if (feelingRate >= 60 && feelingRate <= 100) {
      image = excited;
    }

    return image;
  };

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
    (nowTime.getFullYear() === day.getFullYear() &&
      nowTime.getMonth() < day.getMonth()) ||
    (nowTime.getFullYear() === day.getFullYear() &&
      nowTime.getMonth() === day.getMonth() &&
      nowTime.getDate() < day.getDate());

  // 토요일, 일요일, 주중 구분
  const saturDay: boolean = day.getDay() === 6 ? true : false;
  const sunDay: boolean = day.getDay() === 0 ? true : false;

  const clickDate = () => {
    setClickedDate(day);
    navigate(
      `/view/diary/${day.getFullYear()}-${(day.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${day.getDate().toString().padStart(2, "0")}`
    );
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
        saturDay={saturDay}
        sunDay={sunDay}
      >
        {day.getDate()}
      </DateTitle>
      {averageNegative !== undefined && averagePositive !== undefined ? (
        <img
          src={getFeelingRate(averageNegative, averagePositive)}
          alt=""
          className="w-12 h-12 mt-5"
        />
      ) : (
        <div className="w-12 h-12 mt-5"></div>
      )}
    </DateItemContainer>
  );
}
