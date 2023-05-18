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
  AlarmNumber,
  AlarmListContainer,
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

interface AlarmList {
  id: number;
  clubName: string | null;
  clubUuid: string | null;
  nickname: string;
  type: string;
  username: string;
}

export default function NavBar() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [sideBarState, setSidebarState] = useState(false);
  const [alarmBoxState, setAlarmBoxState] = useState(false);
  const [alarmList, setAlarmList] = useState<AlarmList[]>([]);
  const { memberData, isLoggedIn } = useMember();
  const navigate = useNavigate();
  const nickname = memberData.nickname;
  const profilePic = memberData.profilePic;
  const subscribeUrl = `${process.env.REACT_APP_BASE_URL}/event/sub`;

  useEffect(() => {
    if (initialLoad && isLoggedIn) {
      const eventSource = new EventSource(subscribeUrl, {
        withCredentials: true,
      });

      eventSource.addEventListener("DOUBLE_INVITE", function (event) {
        let message = event.data;
        alert(message);
        console.log(message);
      });

      eventSource.addEventListener("error", function (event) {
        console.log("error");
        console.log(event);
        eventSource.close();
      });
      eventSource.addEventListener("connect", function (event) {
        let message = event.data;
        console.log(message);
      });

      const fetchData = async () => {
        try {
          const data = await getSSEAlarmsApi();
          console.log(data);
          setAlarmList(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
      setInitialLoad(false);
    }
  }, []);

  const showSidebar = () => {
    setSidebarState(true);
  };

  const handleCloseSidebar = () => {
    setSidebarState(false);
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
      {sideBarState === true ? (
        <MobileSidebar onClose={handleCloseSidebar} />
      ) : null}
      <NavbarContainer>
        <NavbarBox>
          <LogoContainer to="/">
            <LogoBlue>Bud</LogoBlue>
            <LogoGreen>:D</LogoGreen>
            <LogoBlue>iary</LogoBlue>
          </LogoContainer>
          <MenuItem to="/group">그룹일기</MenuItem>
          <MenuItem to="/write">일기작성</MenuItem>
          <MenuItem to="/stickers">상점</MenuItem>
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
                {alarmList.length >= 1 ? (
                  <AlarmNumber>{alarmList.length}</AlarmNumber>
                ) : null}
              </AlarmContainer>
            ) : null}
          </ProfileContainer>
          <MobileMenu>
            <RxHamburgerMenu onClick={showSidebar} />
          </MobileMenu>
          {alarmBoxState ? (
            <AlarmListContainer>
              {alarmList.map((alarm) => (
                <AlarmSSE
                  key={alarm.id}
                  id={alarm.id}
                  clubName={alarm.clubName}
                  clubUuid={alarm.clubUuid}
                  nickname={alarm.nickname}
                  type={alarm.type}
                  username={alarm.username}
                />
              ))}
            </AlarmListContainer>
          ) : null}
        </NavbarBox>
      </NavbarContainer>
    </div>
  );
}
