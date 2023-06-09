import { useState, useEffect } from "react";
import {
  InvitationContainer,
  ModalTopNavContainer,
  ModalTopContent,
} from "../common/ModalWindow.styles";
import {
  DescriptionBox,
  SendInvitation,
  RightInvitation,
  LeftInvitation,
  InvitationExample,
  DescriptionContent,
  KakaoContainer,
  JoinButton,
} from "./InvitationModal style";
import { EditTitle } from "../groupdetail/DiaryComment.style";
import { KakaoShare } from "./KakaoShare";
import { Info } from "../../types/group";
import close from "../../assets/modal/close.png";

interface GroupInfoProps {
  clubInfo?: Info;
  onClose: () => void;
}

export function InvitationModal({ clubInfo, onClose }: GroupInfoProps) {
  const defaultDescription = ` ${clubInfo?.clubName}에 당신을 초대합니다.`;
  const [isDescriptionExceeded, setIsDescriptionExceeded] = useState(false);
  const [description, setDescription] = useState(defaultDescription);
  const currentUrl = window.location.href;
  const address = `${process.env.REACT_APP_KAKAO_INVITE_URL}group/approve/${clubInfo?.clubUuid}`;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    if (value.length <= 50) {
      setDescription(value);
      setIsDescriptionExceeded(false);
    } else {
      setIsDescriptionExceeded(true);
    }
  }
  return (
    <InvitationContainer>
      <ModalTopNavContainer
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <ModalTopContent>
          <img
            src={close}
            alt=""
            onClick={onClose}
            style={{
              height: "25px",
              width: "25px",
              border: "none",
            }}
          />
        </ModalTopContent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EditTitle>초대하기</EditTitle>
        </div>
        <div
          style={{
            height: "25px",
            width: "25px",
            border: "none",
          }}
        ></div>
      </ModalTopNavContainer>
      <SendInvitation>
        <LeftInvitation>
          <InvitationExample>
            <img
              src={clubInfo?.thumbnailUrl ?? ""}
              alt="다이어리 썸네일"
              style={{
                width: "100%",
                height: "40%",
                maxHeight: "230px",
                borderRadius: "10px",
              }}
            />
            <p style={{ fontWeight: "800" }}>{clubInfo?.clubName}</p>
            <DescriptionContent>{description || "\u00A0"}</DescriptionContent>
            <div style={{ textAlign: "center" }}>
              <JoinButton>Buddiary 참여하기</JoinButton>
            </div>
            {window.innerWidth > 640 ? null : (
              <KakaoContainer style={{ marginTop: "30px" }}>
                <KakaoShare
                  clubInfo={clubInfo}
                  description={description}
                  address={address}
                />
              </KakaoContainer>
            )}
          </InvitationExample>
        </LeftInvitation>
        {window.innerWidth > 640 ? (
          <RightInvitation>
            <h2 style={{ marginTop: "10%" }}>카카오톡으로 공유하기</h2>
            <h4>- 당신의 스토리를 친구들과 공유해보세요</h4>
            <h4>- 누구든지 Buddiary의 서비스를 함께 이용할 수 있습니다.</h4>
            <h4>초대메세지를 적어주세요 (50자 제한)</h4>
            <DescriptionBox
              value={description}
              onChange={handleDescriptionChange}
              maxLength={50}
              style={
                isDescriptionExceeded ? { border: "1px solid red" } : undefined
              }
            />
            {isDescriptionExceeded && (
              <p style={{ color: "red", fontSize: "5px" }}>
                50자가 넘었습니다.
              </p>
            )}
            <KakaoContainer>
              <KakaoShare
                clubInfo={clubInfo}
                description={description}
                address={address}
              />
            </KakaoContainer>
          </RightInvitation>
        ) : null}
      </SendInvitation>
    </InvitationContainer>
  );
}
