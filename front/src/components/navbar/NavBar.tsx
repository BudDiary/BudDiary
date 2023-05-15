import React, { useEffect } from "react";
import {
  LogoBlue,
  LogoContainer,
  LogoGreen,
  MenuItem,
  ProfileContainer,
  AlarmContainer,
  NavbarContainer,
  MobileMenu,
  NavbarBox,
  NickNameContainer,
  NavProfilePicContainer,
} from "./NavBar.styles";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileSidebar from "./MobileSidebar";
import { useState } from "react";
import { KAKAO_AUTH_URL, api } from "../../apis/axiosConfig";
import useMember from "../../hooks/memberHook";
import { useNavigate } from "react-router-dom";
import { AiFillBell } from "react-icons/ai";
import AlarmSSE from "./AlarmSSE";
import { getSSEAlarmsApi } from "../../apis/noticeApi";

export default function NavBar() {
  const [sideBarState, setSidebarState] = useState(false);
  const [alarmBoxState, setAlarmBoxState] = useState(false);
  const { memberData, isLoggedIn } = useMember();
  const navigate = useNavigate();
  const nickname = memberData.nickname;
  const profilePic = memberData.profilePic;
  const subscribeUrl = "http://localhost:8080/event/sub";
  const eventSource = new EventSource(subscribeUrl, { withCredentials: true });
  useEffect(() => {
    eventSource.addEventListener("DOUBLE_INVITE", function (event) {
      let message = event.data;
      alert(message);
      console.log(message);
    });

    eventSource.addEventListener("error", function (event) {
      console.log("error");
      console.log(event);
      // eventSource.close()
    });
    eventSource.addEventListener("connect", function (event) {
      let message = event.data;
      console.log(message);
      // eventSource.close()
    });

    const fetchData = async () => {
      try {
        const data = await getSSEAlarmsApi();
        console.log(data, "알람");
        // setRecommendList(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const showSidebar = () => {
    setSidebarState(true);
  };
  const handleUser = () => {
    if (isLoggedIn === true) {
      navigate("/mypage");
    } else {
      window.location.href = KAKAO_AUTH_URL;
    }
  };
  const handleAlarms = () => {
    setAlarmBoxState(!alarmBoxState);
  };
  return (
    <div>
      {sideBarState === true ? <MobileSidebar /> : null}
      <NavbarContainer>
        <NavbarBox>
          <LogoContainer to="/">
            <LogoBlue>Bud</LogoBlue>
            <LogoGreen>:D</LogoGreen>
            <LogoBlue>iary</LogoBlue>
          </LogoContainer>
          <MenuItem to="/group">그룹일기</MenuItem>
          <MenuItem to="/write">일기작성</MenuItem>

          <ProfileContainer>
            <NickNameContainer onClick={handleUser}>
              {isLoggedIn ? nickname : "로그인"}
            </NickNameContainer>
            <NavProfilePicContainer
              src={profilePic ? profilePic : "base_profile.jpg"}
              onClick={handleUser}
            ></NavProfilePicContainer>
            {isLoggedIn ? (
              <AlarmContainer onClick={handleAlarms}>
                <AiFillBell className="text-3xl text-bud-green" />
              </AlarmContainer>
            ) : null}
          </ProfileContainer>

          <MobileMenu>
            <RxHamburgerMenu onClick={showSidebar} />
          </MobileMenu>
          {alarmBoxState ? <AlarmSSE /> : null}
        </NavbarBox>
      </NavbarContainer>
    </div>
  );
}
