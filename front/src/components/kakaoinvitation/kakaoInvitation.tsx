import { useState, useEffect } from "react";

import {
  DescriptionBox,
  SendInvitation,
  RightInvitation,
  LeftInvitation,
  InvitationExample,
  DescriptionContent,
  KakaoContainer,
  JoinButton,
  CopyButton,
} from "./InvitationModal style";
import { KakaoShare } from "./KakaoShare";
import { Info } from "../../types/group";

interface GroupInfoProps {
  clubInfo?: Info;
}

export function KakaoInvitation({ clubInfo }: GroupInfoProps) {
  const defaultDescription = ` ${clubInfo?.clubName}에 당신을 초대합니다.`;
  const [isDescriptionExceeded, setIsDescriptionExceeded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
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

  function copyCurrentUrlToClipboard() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(address)
        .then(() => {
          setIsCopied(true);
        })
        .catch((err) => {
          console.error("Failed to copy current URL:", err);
        });
    } else {
      console.error("Clipboard writeText API is not supported.");
    }
  }

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
    <SendInvitation>
      <LeftInvitation>
        <InvitationExample>
          <img
            src={clubInfo?.thumbnailUrl ?? ""}
            alt="다이어리 썸네일"
            style={{ width: "100%", height: "50%" }}
          />
          <p style={{ fontWeight: "800" }}>{clubInfo?.clubName}</p>
          <DescriptionContent>{description || "\u00A0"}</DescriptionContent>
          <div style={{ textAlign: "center" }}>
            <JoinButton>Buddiary 참여하기</JoinButton>
          </div>
          {window.innerWidth > 640 ? null : (
            <KakaoContainer>
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
            <p style={{ color: "red", fontSize: "5px" }}>50자가 넘었습니다.</p>
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
  );
}
