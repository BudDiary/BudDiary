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
} from "./ASection.styles";

export default function ASection() {
  return (
    <SectionContainer>
      <ImageContainer />
      <TextContainer>
        <FirstContent>소중한 추억을</FirstContent>
        <SeceondContent>
          <FirstDetail>
            Bud<EasterEgg>:D</EasterEgg>iary{" "}
          </FirstDetail>
          <SeceondDetail>에서</SeceondDetail>
        </SeceondContent>
        <ThirdContent>공유해보세요</ThirdContent>
      </TextContainer>
    </SectionContainer>
  );
}
