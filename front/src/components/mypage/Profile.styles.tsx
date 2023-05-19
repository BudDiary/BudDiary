import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";

export const UserProfileContainer = styled.div`
  ${tw`grid grid-cols-2 m-6`}
`;

export const ProfilePicSection = styled.img`
  ${tw`sm:col-span-1 min-w-[160px] max-w-[160px] min-h-[160px] max-h-[160px] border-2 border-gray-200 rounded-full sm:mb-10 ml-2 mt-1`}
`;

export const ProfileInfoSection = styled.div`
  ${tw`mt-10 ml-10`}
`;
export const NicknameBox = styled.div`
  ${tw`text-xl font-bold`}
`;

export const IntroContainer = styled.div`
  ${tw`col-span-2`}
`;

export const IntroTitle = styled.div`
  ${tw`font-bold`}
`;

export const PointsButton = styled(Link)`
  ${tw`bg-bud-blue text-white w-[100px] h-[30px] rounded-md flex justify-center my-6`}
`;

export const ChangeProfileSection = styled.div`
  ${tw`sm:mt-20 `}
`;

export const LogoutButtonContainer = styled.div`
  ${tw`col-start-2 flex justify-end`}
`;
