import styled from "styled-components";
import tw from "twin.macro";

export const MyPageContainer = styled.div`
    ${tw`grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-4`}
`

export const MyProfileInfoContainer = styled.div`
    ${tw`border-b-2`}
`

export const MyDiaryCalendarContainer = styled.div`
    ${tw`sm:row-span-2 border-l-2`}
`
