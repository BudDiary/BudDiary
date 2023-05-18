import styled, { css } from "styled-components";
import tw from "twin.macro";

interface ContainerProps {
  sameMonth: boolean;
  sameDay: boolean;
  futureDay: boolean;
  saturDay: boolean;
  sunDay: boolean;
}

interface Container2Props {
  sameDay: boolean;
  clickDay: boolean;
  futureDay: boolean;
}

export const DateItemContainer = styled.div<Container2Props>`
  ${({ sameDay }) => (sameDay ? tw`bg-bud-green` : tw``)}
  ${({ futureDay }) =>
    futureDay
      ? tw`bg-gray-200 pointer-events-none`
      : tw`hover:bg-bud-blue hover:cursor-pointer`}
  ${({ clickDay }) =>
    clickDay
      ? tw`
          border-bud-blue
        `
      : css``}
  ${tw`border-[1px] border-gray-300 pt-2 pb-8 pl-3`}
`;

// 같은 달이면 두껍게
// font-weight: ${({ futureDay }) => (futureDay ? `300` : `700`)};
export const DateTitle = styled.div<ContainerProps>`
  font-weight: ${({ sameMonth }) => (sameMonth ? `500` : `300`)};
  ${({ sameDay }) => (sameDay ? tw`text-white` : tw``)}
  ${({ sunDay }) => (sunDay ? tw`text-red-700` : tw``)}
  ${({ saturDay }) => (saturDay ? tw`text-blue-700` : tw``)}

  ${tw``}
`;
