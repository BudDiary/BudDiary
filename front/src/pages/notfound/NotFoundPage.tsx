import React from "react";
import { LogoBlue, LogoGreen } from "../../components/navbar/NavBar.styles";
import {
  NotFoundContainer,
  NotFoundNotice,
  NoticeContainer,
  ErrorNotice,
  ErrorText,
  NavButton,
  NoticeNav,
  ButtonSet,
  NotText,
} from "./NotFoundPage.styles";
import { useNavigate } from "react-router";
import useMember from "../../hooks/memberHook";

interface TestSpanProps {
  delay: number;
}
export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <NotFoundContainer>
      <NotFoundNotice>
        <LogoBlue>Bud</LogoBlue>
        <LogoGreen>:(</LogoGreen>
        <LogoBlue>iary</LogoBlue>
      </NotFoundNotice>

      <NoticeContainer>
        <ErrorNotice>
          <ErrorText delay={0.1}>4</ErrorText>
          <ErrorText delay={0.3}>0</ErrorText>
          <ErrorText delay={0.5}>4 </ErrorText>
          <NotText delay={0.7}>N</NotText>
          <NotText delay={0.9}>O</NotText>
          <NotText delay={1.1}>T </NotText>
          <ErrorText delay={1.3}>F</ErrorText>
          <ErrorText delay={1.5}>O</ErrorText>
          <ErrorText delay={1.7}>U</ErrorText>
          <ErrorText delay={1.9}>N</ErrorText>
          <ErrorText delay={2.1}>D</ErrorText>
        </ErrorNotice>
      </NoticeContainer>
      <NoticeNav>
        <div>
          <p>죄송합니다 원하시는 페이지를 찾을 수 없습니다.</p>
          <p>혹시, 다음 서비스를 찾고 있으신가요?</p>
        </div>

        <ButtonSet>
          <NavButton onClick={() => navigate("/")}>Main Page</NavButton>
          <NavButton onClick={() => navigate("/group")}>Group Page</NavButton>
          <NavButton onClick={() => navigate("/write")}>Write Diary</NavButton>
        </ButtonSet>
      </NoticeNav>
    </NotFoundContainer>
  );
}
