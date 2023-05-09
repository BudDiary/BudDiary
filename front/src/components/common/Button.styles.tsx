import styled from "styled-components";
import tw from "twin.macro";

export const FullRoundedButton = styled.button`
    ${tw`bg-bud-pink text-white w-[100px] h-[30px] rounded-md flex px-2 my-2 py-0.5`}
`
export const SurveyAgainButton = styled.button`
  ${tw`bg-bud-blue text-white w-[120px] h-[45px] rounded-md`}
`;
export const EditButton = styled.button`
  ${tw`text-bud-blue  w-[35px] h-[20px]`}
`;
export const DeleteButton = styled.button`
  ${tw`text-bud-pink  w-[35px] h-[20px]`}
`;

export const ResetButton = styled.button`
  ${tw`bg-bud-pink text-white h-10 rounded-sm px-4`}
`;
