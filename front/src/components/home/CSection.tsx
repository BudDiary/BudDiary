import React from "react";
import {
  SectionContainer,
  ImageContainer,
  TextContainer,
  FirstSection,
  SeceondSection,
  ThirdSection,
  ChangeBox,
  TextBox,
} from "./CSection.styles";

export default function CSection() {
  return (
    <SectionContainer>
      <ImageContainer />
      <TextContainer>
        <FirstSection>친구들의 일상을</FirstSection>
        <SeceondSection>확인하고</SeceondSection>
        <ThirdSection>
          <ChangeBox>반응을 </ChangeBox>
          <TextBox>남겨주세요</TextBox>
        </ThirdSection>
      </TextContainer>
    </SectionContainer>
  );
}
