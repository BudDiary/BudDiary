import styled from "styled-components";
import tw from "twin.macro";

export const StickerImageBox = styled.img`
  ${tw`h-[70%] mx-auto`}
`;

export const StickerPriceBox = styled.div`
  ${tw`font-bold text-2xl font-berry mt-4 text-center`}
`;

export const IndividualStickerContainer = styled.div`
  ${tw`border border-gray-200 rounded-lg p-4 shadow`}
`;
