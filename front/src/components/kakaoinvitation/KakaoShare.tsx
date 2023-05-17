import React, { useEffect } from "react";
import { Info } from "../../types/group";
import kakao from "../../assets/modal/kakaotalk.png";
import { LoginButton } from "../navbar/MobileSidebar.styles";
declare global {
  interface Window {
    Kakao: any;
  }
}
interface GroupInfoProps {
  clubInfo?: Info;
  description: string;
  address: string;
}

export const KakaoShare = ({
  clubInfo,
  description,
  address,
}: GroupInfoProps) => {
  const createKakaoButton = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init("3f9ab37954d904c89a4a1a068d784064");
      }

      kakao.Link.createDefaultButton({
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: clubInfo?.clubName,
          description: description,
          imageUrl: clubInfo?.thumbnailUrl, // i.e. process.env.FETCH_URL + '/logo.png'
          link: {
            mobileWebUrl: address,
            webUrl: address,
          },
        },
        social: {
          // likeCount: 77,
          // commentCount: 55,
          // sharedCount: 333,
        },
        buttons: [
          {
            title: "Buddiary 참여하기",
            link: {
              mobileWebUrl: address,
              webUrl: address,
            },
          },
          // {
          //   title: "앱으로 보기",
          //   link: {
          //     mobileWebUrl: window.location.href,
          //     webUrl: window.location.href,
          //   },
          // },
        ],
      });
    }
  };
  return (
    <div className="kakao-share-button">
      <LoginButton id="kakao-link-btn" onClick={createKakaoButton}>
        <img src={kakao} alt="kakao-share-icon" />
        으로 친구 초대하기
      </LoginButton>
    </div>
  );
};
