import styled from "styled-components";
import tw from "twin.macro";

export const MyPageContainer = styled.div`
    ${tw`grid grid-cols-1 h-[calc(100%-56px)] sm:grid-cols-2 sm:grid-rows-2 gap-4 bg-red-200`}
`

export const MyProfileInfoContainer = styled.div`
    ${tw`bg-blue-200`}
`

export const MyDiaryCalendarContainer = styled.div`
    ${tw`bg-green-200 row-span-2`}
`