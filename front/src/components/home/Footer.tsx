import React from "react";
import {
  Container,
  TextSection,
  FirstSection,
  SecondSection,
  ThirdSection,
  FourthSection,
} from "./Footer.styles";

export default function ASection() {
  return (
    <Container>
      <TextSection>
        <FirstSection>상호 : 버디어리</FirstSection>
        <SecondSection>사업자명 : 김명진</SecondSection>
        <ThirdSection>사업자번호 : 568-21-01664</ThirdSection>
        <FourthSection>
          주소: 광주광역시 광산구 풍영로 294-8, 102동 502호(장덕동, 수완루아채)
        </FourthSection>
      </TextSection>
    </Container>
  );
}
