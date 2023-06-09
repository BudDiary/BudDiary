import styled from "styled-components";
import tw from "twin.macro";

export const FullRoundedButton = styled.button`
  ${tw`bg-bud-pink text-white w-[100px] h-[30px] rounded-md flex px-2 my-3 py-0.5`}
`;
export const SurveyAgainButton = styled.button`
  ${tw`bg-bud-blue text-white w-[120px] h-[45px] rounded-md`}
`;
export const EditButton = styled.button`
  ${tw`text-bud-blue  w-[35px] h-[20px]`}
`;
export const DeleteButton = styled.button`
  ${tw`text-bud-pink  w-[35px] h-[20px]`}
  font-size: 12px;
`;

export const ResetButton = styled.button`
  ${tw`bg-bud-pink text-white h-10 rounded-sm px-4`}
`;

export const EditSubmitButton = styled.button`
  ${tw`bg-bud-blue text-white h-10 rounded-sm px-4 w-[200px] ml-3`}
`;

export const AcceptInvitationButton = styled.button`
  ${tw`bg-bud-pink text-white h-10 rounded-sm px-4 w-[40%] ml-3`}
`;

export const DeclineInvitationButton = styled.button`
  ${tw`bg-gray-400 text-white h-10 rounded-sm px-4 w-[40%] ml-3`}
`;
