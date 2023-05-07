import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  SectionContainer,
  ImageContainer,
  TextContainer,
  FirstContent,
  SeceondContent,
  ThirdContent,
  FirstDetail,
  SeceondDetail,
  EasterEgg,
  MouseHelper,
  MouseWheel,
  BounceText,
} from "./ASection.styles";

export default function ASection() {
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
    <SectionContainer ref={ref}>
      <ImageContainer />
      <TextContainer>
        <FirstContent run={run}>소중한 추억을</FirstContent>
        <SeceondContent>
          <FirstDetail run={run}>
            <BounceText time={"4s"}>B</BounceText>
            <BounceText time={"4.1s"}>u</BounceText>
            <BounceText time={"4.2s"}>d</BounceText>
            <EasterEgg time={"4.3s"}>:D</EasterEgg>
            <BounceText time={"4.4s"}>i</BounceText>
            <BounceText time={"4.5s"}>a</BounceText>
            <BounceText time={"4.6s"}>r</BounceText>
            <BounceText time={"4.7s"}>y</BounceText>
          </FirstDetail>
          <SeceondDetail run={run}>에서</SeceondDetail>
        </SeceondContent>
        <ThirdContent run={run}>공유해보세요</ThirdContent>
      </TextContainer>
      <MouseHelper />
      <MouseWheel run={run} />
    </SectionContainer>
  );
}
