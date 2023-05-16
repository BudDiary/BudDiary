import { useState, useEffect } from "react";
import { EditContainer } from "../../common/ModalWindow.styles";
import { KakaoShare } from "./KakaoShare";
import { Info } from "../../../types/group";
import close from "../../../assets/modal/close.png";
interface GroupInfoProps {
  clubInfo?: Info;
  onClose: () => void;
}
export function InvitationModal({ clubInfo, onClose }: GroupInfoProps) {
  const [isCopied, setIsCopied] = useState(false);

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
    const currentUrl = window.location.href;
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
    <EditContainer>
      <img src={close} alt="" onClick={onClose} />
      <button onClick={copyCurrentUrlToClipboard}>
        {isCopied ? "복사 완료!" : "현재 주소 복사하기"}
      </button>
      <KakaoShare clubInfo={clubInfo} />
    </EditContainer>
  );
}
