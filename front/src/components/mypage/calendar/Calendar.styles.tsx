import styled from "styled-components";
import tw from "twin.macro";

export const CalendarContainer = styled.div`
  ${tw`flex-col m-5`}
`

export const DateControlContainer = styled.div`
  ${tw`flex justify-between text-2xl font-bold`}
`

export const ChangeDateButton = styled.button`
  ${tw`w-10 h-10 hover:bg-bud-green`}
`
export const TodayMonthYear = styled.button`
  ${tw``}
`

export const CalendarSection = styled.div`
  ${tw`grid grid-cols-7 mt-4`}
`

interface ContainerProps {
  isSaturday: boolean;
  isSunday: boolean;
}

export const WeekDaySection = styled.div<ContainerProps>`
  ${({ isSaturday }) =>
  isSaturday
    ? tw`text-blue-500`
    : tw``}
  ${({ isSunday }) =>
    isSunday
      ? tw`text-red-500`
      : tw``}
  ${tw`ml-3`}
`