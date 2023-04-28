import styled from "styled-components";
import tw from "twin.macro";

export const DetailPageContainer = styled.div`
  ${tw`grid grid-cols-1 sm:grid-cols-3 gap-4 bg-red-200`}
`

export const DiariesContainer = styled.div`
  ${tw`sm:col-span-2 bg-blue-200`}
`

export const GroupInfoContainer = styled.div`
  ${tw`bg-green-200`}
`