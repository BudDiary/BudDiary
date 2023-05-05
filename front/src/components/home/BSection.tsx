import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
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
  const [ref, inView] = useInView({ threshold: 0.9 });
  const [run, setRun] = useState<string>("paused");

  useEffect(() => {
    if (inView) {
      setRun("running");
      console.log(inView);
    } else {
    }
  }, [inView]);
  return (
    <Container ref={ref}>
      <SectionContainer>
        <ImageSection Image={img} run={run}></ImageSection>
        <TextContainer>
          <TextSection>
            <FirstDetail run={run}>일기 분석을 통해</FirstDetail>
            <SecondBox>
              <SecondDetail run={run}>
                내 취향, 감정을
                <UnderLine run={run}>
                  <UnderLine2 run={run}></UnderLine2>
                </UnderLine>
              </SecondDetail>
            </SecondBox>
            <ThirdDetail run={run}>확인하세요</ThirdDetail>
          </TextSection>
          <WordSection run={run}>
            기타 여러가지 텍스트들이 등장합니다
          </WordSection>
        </TextContainer>
      </SectionContainer>
      <WordsSection>작아졌을 때 여러가지 텍스트들이 등장합니다</WordsSection>
    </Container>
  );
}
