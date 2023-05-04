import styled from "styled-components";
import tw from "twin.macro";

export const MyPageContainer = styled.div`
    ${tw`grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-4`}
`

export const MyProfileInfoContainer = styled.div`
    ${tw`bg-blue-200`}
`

export const MyDiaryCalendarContainer = styled.div`
    ${tw`bg-red-200 sm:row-span-2`}
`
