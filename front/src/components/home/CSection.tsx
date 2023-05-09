import React, { useState, useEffect } from "react";
import TypeIt from "typeit-react";
import { useInView } from "react-intersection-observer";
import {
  SectionContainer,
  ImageContainer,
  TextContainer,
  FirstSection,
  AppearText,
  SeceondSection,
  ThirdSection,
  TypeText,
  TextBox,
} from "./CSection.styles";

export default function CSection() {
  const [ref, inView] = useInView({ threshold: 0.9 });
  const [run, setRun] = useState<string>("paused");
  const [text, setText] = useState<string>("    ");

  useEffect(() => {
    if (inView) {
      setRun("running");
      if (text === "    ") {
        setText("반응을 ");
        console.log(inView, "ㅈㅣ금부터터");
      }
    }
  }, [inView]);
  return (
    <SectionContainer ref={ref}>
      <ImageContainer></ImageContainer>
      <TextContainer>
        <FirstSection>
          <AppearText time={"0.1s"} run={run}>
            친
          </AppearText>
          <AppearText time={"0.15s"} run={run}>
            구
          </AppearText>
          <AppearText time={"0.2s"} run={run}>
            들
          </AppearText>
          <AppearText time={"0.25s"} run={run}>
            의
          </AppearText>
          <AppearText time={"0.3s"} run={run}>
            {" "}
          </AppearText>
          <AppearText time={"0.35s"} run={run}>
            일
          </AppearText>
          <AppearText time={"0.4s"} run={run}>
            상
          </AppearText>
          <AppearText time={"0.45s"} run={run}>
            을
          </AppearText>
        </FirstSection>
        <SeceondSection>
          <AppearText time={"0.5s"} run={run}>
            확
          </AppearText>
          <AppearText time={"0.55s"} run={run}>
            인
          </AppearText>
          <AppearText time={"0.6s"} run={run}>
            하
          </AppearText>
          <AppearText time={"0.65s"} run={run}>
            고
          </AppearText>
        </SeceondSection>
        <ThirdSection>
          <TypeText>
            {/* <TypeIt
              options={{
                strings: ["반응을", "스티커를"],
                lifeLike: true,
                cursor: false,
                loop: true,
                startDelay: 2000,
                waitUntilVisible: true,
                deleteSpeed: 300,
                breakLines: false,
                nextStringDelay: 2000,
              }}
            /> */}
          </TypeText>

          {/* <ChangeBox time={"0.7s"} run={run}>
            <AppearText time={"0.7s"} run={run}>
              {text[0]}
            </AppearText>
            <AppearText time={"0.75s"} run={run}>
              {text[1]}
            </AppearText>
            <AppearText time={"0.8s"} run={run}>
              {text[2]}
            </AppearText>
            <AppearText time={"0.85s"} run={run}>
              {text[3]}
            </AppearText>
          </ChangeBox> */}
          <TextBox time={"0.9s"} run={run}>
            <AppearText time={"0.9s"} run={run}>
              &nbsp; 남
            </AppearText>
            <AppearText time={"0.95s"} run={run}>
              겨
            </AppearText>
            <AppearText time={"1s"} run={run}>
              주
            </AppearText>
            <AppearText time={"1.05s"} run={run}>
              세
            </AppearText>
            <AppearText time={"1.1s"} run={run}>
              요
            </AppearText>
          </TextBox>
        </ThirdSection>
      </TextContainer>
    </SectionContainer>
  );
}
