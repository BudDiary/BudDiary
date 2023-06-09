import React, { useState, useEffect } from "react";

import { useInView } from "react-intersection-observer";
import {
  Container,
  Excited,
  Happy,
  Sad,
  Crying,
  Normal,
  SExcited,
  SHappy,
  SSad,
  SCrying,
  SNormal,
  SectionContainer,
  ImageSection,
  FirstImageBox,
  SecondImageBox,
  TextSection,
  WordSection,
  FirstDetail,
  SecondDetail,
  ThirdDetail,
  TextContainer,
  WordsSection,
  UnderLine,
  SecondBox,
  ImgMargin,
  ImgBox,
} from "./BSection.styles";
import img from "./assets/Testimg916.jpg";
import img2 from "./assets/senti.jpg";

export default function BSection() {
  const [ref, inView] = useInView({ threshold: 0.9 });
  const [run, setRun] = useState<string>("paused");

  useEffect(() => {
    if (inView) {
      setRun("running");
    } else {
    }
  }, [inView]);
  return (
    <Container ref={ref}>
      <SectionContainer>
        <ImageSection run={run}>
          <FirstImageBox>
            <ImgBox>
              {/* 첫번쨰 */}
              <img src={img} alt="" />
            </ImgBox>
            <ImgMargin></ImgMargin>
          </FirstImageBox>
          <SecondImageBox>
            <ImgMargin></ImgMargin>
            <ImgBox>
              {/* 두번째 */}
              <img src={img2} alt="" />
            </ImgBox>
          </SecondImageBox>
        </ImageSection>
        <TextContainer>
          <TextSection>
            <FirstDetail run={run}>일기 분석을 통해</FirstDetail>
            <SecondBox>
              <SecondDetail run={run}>
                내 &nbsp;
                <span className="relative">
                  취향
                  <UnderLine run={run} time={"3s"} />
                </span>
                ,&nbsp;
                <span className="relative">
                  감정
                  <UnderLine run={run} time={"3.3s"} />
                </span>
                을
                {/* <UnderLine run={run}>
                  <UnderLine2 run={run}></UnderLine2>
                </UnderLine> */}
              </SecondDetail>
            </SecondBox>
            <ThirdDetail run={run}>확인하세요</ThirdDetail>
          </TextSection>
          <WordSection run={run}>
            <Excited run={run} />
            <Happy run={run} />
            <Normal run={run} />
            <Sad run={run} />
            <Crying run={run} />
            {/* <TypeIt
              options={{
                strings: [
                  "기타 여러가지 텍스트가 등장합니다",
                  "기타 여러가지 텍스트가 등장합니다",
                ],
                lifeLike: true,
                cursor: false,
                startDelay: 4500,
                waitUntilVisible: true,
              }}
            /> */}
          </WordSection>
        </TextContainer>
      </SectionContainer>
      <WordsSection run={run}>
        <SExcited run={run} />
        <SHappy run={run} />
        <SNormal run={run} />
        <SSad run={run} />
        <SCrying run={run} />
        {/* <TypeIt
          options={{
            strings: [
              "기타 여러가지 텍스트가 등장합니다",
              "기타 여러가지 텍스트가 등장합니다",
            ],
            lifeLike: true,
            cursor: false,
            startDelay: 4500,
            waitUntilVisible: true,
          }}
        /> */}
      </WordsSection>
    </Container>
  );
}
