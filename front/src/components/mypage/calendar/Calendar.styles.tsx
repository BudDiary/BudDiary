import styled from "styled-components";
import tw from "twin.macro";

export const CalendarContainer = styled.div`
  ${tw`flex-col`}
`

export const DateControlContainer = styled.div`
  ${tw`flex justify-between`}
`

export const ChangeDateButton = styled.button`
  ${tw`w-10 h-10 hover:bg-bud-green`}
`
export const TodayMonthYear = styled.button`
  ${tw``}
`

export const CalendarSection = styled.div`
  ${tw`grid grid-cols-7`}
`

export const WeekDaySection = styled.div`
  ${tw`text-center bg-bud-green border-[0.5px] border-black`}
`