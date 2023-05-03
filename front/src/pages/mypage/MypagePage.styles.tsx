import styled from "styled-components";
import tw from "twin.macro";

export const MyPageContainer = styled.div`
    height: 100vh;
    ${tw`grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-4 bg-red-200`}
`
export const SubNavContainer = styled.div`
    ${tw`bg-orange-700 sm:h-[180px] h-0 text-center sm:pt-16 text-3xl`}
`

export const MyProfileInfoContainer = styled.div`
    ${tw`bg-blue-200`}
`

export const MyDiaryCalendarContainer = styled.div`
    ${tw`bg-green-200 row-span-2`}
`