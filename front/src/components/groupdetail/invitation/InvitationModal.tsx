import { useState, useEffect } from "react";
import {
  InvitationContainer,
  ModalTopNavContainer,
} from "../../common/ModalWindow.styles";
import {
  DescriptionBox,
  SendInvitation,
  RightInvitation,
  LeftInvitation,
  InvitationExample,
  JoinButton,
  CopyButton,
} from "./InvitationModal style";
import { EditTitle } from "../DiaryComment.style";
import { KakaoShare } from "./KakaoShare";
import { Info } from "../../../types/group";
import close from "../../../assets/modal/close.png";

interface GroupInfoProps {
  clubInfo?: Info;
  onClose: () => void;
}

export function InvitationModal({ clubInfo, onClose }: GroupInfoProps) {
  const defaultDescription = ` ${clubInfo?.clubName}에 당신을 초대합니다.`;
  const [isCopied, setIsCopied] = useState(false);
  const [description, setDescription] = useState(defaultDescription);
  const currentUrl = window.location.href;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function copyCurrentUrlToClipboard() {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => {
        console.error("Failed to copy current URL:", err);
      });
  }

  return (
    <InvitationContainer>
      <ModalTopNavContainer
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
        </div>
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
              style={{ width: "100%", height: "50%" }}
            />
            <p style={{ fontWeight: "800" }}>{clubInfo?.clubName}</p>
            <p
              style={{
                fontWeight: "200",
                overflowY: "auto",
                maxHeight: "100px",
              }}
            >
              {description || "\u00A0"}
            </p>
            <div style={{ textAlign: "center" }}>
              <JoinButton>{clubInfo?.clubName}에 참여하기</JoinButton>
            </div>
          </InvitationExample>
        </LeftInvitation>
        <RightInvitation>
          <h2>주소 복사하기</h2>
          <span>
            {currentUrl}
            <CopyButton onClick={copyCurrentUrlToClipboard}>
              {isCopied ? "copied" : "copy"}
            </CopyButton>
          </span>
          <h2>카카오톡으로 공유하기</h2>
          <h3>초대메세지를 적어주세요</h3>
          <DescriptionBox
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <KakaoShare clubInfo={clubInfo} description={description} />
        </RightInvitation>
      </SendInvitation>
    </InvitationContainer>
  );
}
