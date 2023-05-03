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
            Bud<EasterEgg>:D</EasterEgg>iary{" "}
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
