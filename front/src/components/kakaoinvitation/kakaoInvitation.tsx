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
import { api } from "../../apis/axiosConfig";
interface GroupInfoProps {
  clubInfo?: Info;
}

export function KakaoInvitation({ clubInfo }: GroupInfoProps) {
  const defaultDescription = ` ${clubInfo?.clubName}에 당신을 초대합니다.`;
  const [isDescriptionExceeded, setIsDescriptionExceeded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [description, setDescription] = useState(defaultDescription);
  const currentUrl = window.location.href;
  console.log(api);
  const address = `http://localhost:3000/group/approve/${clubInfo?.clubUuid}`;
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
      .writeText(address)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => {
        console.error("Failed to copy current URL:", err);
      });
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
        </InvitationExample>
      </LeftInvitation>
      {window.innerWidth > 640 ? (
        <RightInvitation>
          <h2>주소 복사하기</h2>
          <span>
            <p>{address}</p>
            <CopyButton onClick={copyCurrentUrlToClipboard}>
              {isCopied ? "copied" : "copy"}
            </CopyButton>
          </span>
          <h2>카카오톡으로 공유하기</h2>
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
          <KakaoContainer style={{ marginTop: "20px" }}>
            <KakaoShare
              clubInfo={clubInfo}
              description={description}
              address={address}
            />
          </KakaoContainer>
        </RightInvitation>
      ) : (
        <KakaoContainer style={{ marginTop: "20px" }}>
          <KakaoShare
            clubInfo={clubInfo}
            description={description}
            address={address}
          />
        </KakaoContainer>
      )}
    </SendInvitation>
  );
}
