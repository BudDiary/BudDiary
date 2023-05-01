import React from "react";
import {
  SectionContainer,
  ImageContainer,
  TextContainer,
  TmpMargin,
  FirstDetail,
  SecondDetail,
  ThirdDetail,
} from "./BSection.styles";

export default function BSection() {
  return (
    <SectionContainer>
      <ImageContainer></ImageContainer>
      <TmpMargin></TmpMargin>
      <TextContainer>
        <FirstDetail>일기 분석을 통해</FirstDetail>
        <SecondDetail>내 취향, 감정을</SecondDetail>
        <ThirdDetail>확인하세요</ThirdDetail>
      </TextContainer>
    </SectionContainer>
  );
}
