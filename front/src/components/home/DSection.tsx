import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  ContentSection,
  TextContainer,
  AppearText,
  LazyAppearText,
  FirstSection,
  FirstBox,
  SeceondSection,
  SecondBox,
  ButtonTextBox,
  ButtonSubBox,
  ButtonSSubBox,
  ButtonArrowBox,
  WhiteBox,
  ButtonArrow,
  ButtonText,
  ThirdSection,
  ButtonSection,
  ImageContainer,
} from "./DSection.styles";
import { SectionContainer } from "./DSection.styles";
import dimg1 from "./assets/DSectionimg916.jpg";
import dimg2 from "./assets/DSectionimg2.jpg";
import dimg3 from "./assets/DSectionimg3.jpg";
import dimg4 from "./assets/DSectionimg4.jpg";
import dimg5 from "./assets/DSectionimg5.jpg";

export default function DSection() {
  const [ref, inView] = useInView({ threshold: 0.9 });
  const [run, setRun] = useState<string>("paused");
  const [text, setText] = useState<string>("의");
  const [selectImg, setselectImg] = useState<string>(dimg1);

  useEffect(() => {
    if (inView) {
      setRun("running");
      console.log(inView);
      setTimeout(() => {
        setText("와");
      }, 6500);
    } else {
    }
  }, [inView]);

  const images = [dimg1, dimg2, dimg3, dimg4, dimg5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const changeImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setselectImg(images[currentImageIndex]);
    };

    const interval = setInterval(changeImage, 8000);

    return () => {
      clearInterval(interval);
    };
  }, [currentImageIndex]);

  const handleButtonClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setselectImg(images[currentImageIndex]);
  };

  return (
    <SectionContainer run={run} image={selectImg} ref={ref}>
      <ContentSection>
        <TextContainer>
          <FirstSection>
            <FirstBox>
              <AppearText time={"1.6s"} run={run}>
                나
              </AppearText>
              <LazyAppearText time={"1.7s"} run={run}>
                <WhiteBox run={run}></WhiteBox>
                {text}
              </LazyAppearText>
              <SecondBox run={run}>&nbsp; 취향이 맞는</SecondBox>
            </FirstBox>
            {/* <SecondBox>ddd</SecondBox> */}
          </FirstSection>
          <SeceondSection>
            <FirstBox>
              <AppearText time={"1.8s"} run={run}>
                교
              </AppearText>
              <AppearText time={"1.9s"} run={run}>
                환
              </AppearText>
              <AppearText time={"2s"} run={run}>
                일
              </AppearText>
              <AppearText time={"2.1s"} run={run}>
                기
              </AppearText>
              <SecondBox run={run}>&nbsp; 메이트</SecondBox>
            </FirstBox>
          </SeceondSection>
          <ThirdSection>
            <FirstBox>
              <AppearText time={"2.2s"} run={run}>
                만
              </AppearText>
              <AppearText time={"2.3s"} run={run}>
                들
              </AppearText>
              <AppearText time={"2.4s"} run={run}>
                기
              </AppearText>
            </FirstBox>
          </ThirdSection>
          <ButtonSection>
            <ButtonTextBox run={run}></ButtonTextBox>
            <ButtonSubBox run={run}></ButtonSubBox>
            <ButtonSSubBox run={run}></ButtonSSubBox>
            <ButtonText> 일기 작성하기 </ButtonText>
            <ButtonArrowBox>
              <ButtonArrow>➟</ButtonArrow>
            </ButtonArrowBox>
          </ButtonSection>
        </TextContainer>
        <ImageContainer image={selectImg} onClick={handleButtonClick} />
      </ContentSection>
    </SectionContainer>
  );
}
