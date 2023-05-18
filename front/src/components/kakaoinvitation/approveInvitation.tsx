import { useState, useEffect } from "react";
import { PostApproveInvitationApi, getClubDetailApi } from "../../apis/clubApi";
import useMember from "../../hooks/memberHook";
import { Club } from "../../types/group";
import { useNavigate } from "react-router-dom";
import {
  JoinContainer,
  JoinGreenText,
  JoinText,
  JoinNotice,
  WelcomeText,
  VisitButton,
  WarningText,
  WelcomeContainer,
} from "./approveInvitation.style";
import { LoginButton } from "../navbar/MobileSidebar.styles";
import kakao from "../../assets/modal/kakaotalk.png";
import { KAKAO_AUTH_URL } from "../../apis/axiosConfig";
import { LogoBlue, LogoGreen } from "../navbar/NavBar.styles";
export default function ApproveInvitation() {
  const currentUrl = window.location.href;
  const navigate = useNavigate();
  const [clubData, setClubData] = useState<Club | null>(null);
  const { isLoggedIn } = useMember();
  const lastSegment = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);

  const handleUser = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleVisitClub = () => {
    navigate(`/group/${lastSegment}`);
  };
  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        try {
          await PostApproveInvitationApi(lastSegment);
          const data = await getClubDetailApi(lastSegment);
          setClubData(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [isLoggedIn, lastSegment]);

  const clubName = clubData?.clubDetail.clubInfo.clubName;
  const thumbnailUrl = clubData?.clubDetail.clubInfo.thumbnailUrl;

  return (
    <JoinContainer>
      {isLoggedIn ? (
        <WelcomeContainer>
          <JoinNotice>
            <JoinText delay={0.1}>B</JoinText>
            <JoinText delay={0.3}>U</JoinText>
            <JoinText delay={0.5}>D</JoinText>
            <JoinGreenText delay={0.7}>:</JoinGreenText>
            <JoinGreenText delay={0.9}>D</JoinGreenText>
            <JoinText delay={1.1}>I</JoinText>
            <JoinText delay={1.3}>A</JoinText>
            <JoinText delay={1.5}>R</JoinText>
            <JoinText delay={1.7}>Y</JoinText>
          </JoinNotice>
          <img src={thumbnailUrl || ""} alt="Club Thumbnail" />
          <WelcomeText style={{ marginTop: "20px" }}>
            회원님은 "{clubName}"에 초대되었습니다.
          </WelcomeText>
          <WelcomeText>비슷한 관심사를 가진 사람들과</WelcomeText>
          <WelcomeText>당신의 스토리를 나눠보세요</WelcomeText>
          <VisitButton onClick={handleVisitClub}>
            지금 "{clubName}" 방문하기
          </VisitButton>
        </WelcomeContainer>
      ) : (
        <div>
          <JoinNotice>
            <JoinText delay={0.1}>B</JoinText>
            <JoinText delay={0.3}>U</JoinText>
            <JoinText delay={0.5}>D</JoinText>
            <JoinGreenText delay={0.7}>:</JoinGreenText>
            <JoinGreenText delay={0.9}>(</JoinGreenText>
            <JoinText delay={1.1}>I</JoinText>
            <JoinText delay={1.3}>A</JoinText>
            <JoinText delay={1.5}>R</JoinText>
            <JoinText delay={1.7}>Y</JoinText>
          </JoinNotice>
          <WarningText>
            <LogoBlue>"Bud</LogoBlue>
            <LogoGreen>:D</LogoGreen>
            <LogoBlue>iary"</LogoBlue>의 서비스는 로그인한 회원에게만
            제공됩니다.
          </WarningText>
          <WarningText>로그인 하신 뒤, 재접속을 시도해주세요</WarningText>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "center",
            }}
          >
            <LoginButton onClick={handleUser}>
              <img src={kakao} alt="로그인" />
              으로 로그인하기
            </LoginButton>
          </div>
        </div>
      )}
    </JoinContainer>
  );
}
