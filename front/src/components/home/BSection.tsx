import React from "react";
import {
  Container,
  SectionContainer,
  ImageSection,
  TextSection,
  WordSection,
  FirstDetail,
  SecondDetail,
  ThirdDetail,
  TextContainer,
  WordsSection,
  UnderLine,
  UnderLine2,
  SecondBox,
} from "./BSection.styles";
import img from "./assets/Testimg916.jpg";

export default function BSection() {
  return (
    <Container>
      <SectionContainer>
        <ImageSection Image={img}></ImageSection>
        <TextContainer>
          <TextSection>
            <FirstDetail>일기 분석을 통해</FirstDetail>
            <SecondBox>
              <SecondDetail>
                내 취향, 감정을
                <UnderLine>
                  <UnderLine2></UnderLine2>
                </UnderLine>
              </SecondDetail>
            </SecondBox>
            <ThirdDetail>확인하세요</ThirdDetail>
          </TextSection>
          <WordSection>기타 여러가지 텍스트들이 등장합니다</WordSection>
        </TextContainer>
      </SectionContainer>
      <WordsSection>작아졌을 때 여러가지 텍스트들이 등장합니다</WordsSection>
    </Container>
  );
}
