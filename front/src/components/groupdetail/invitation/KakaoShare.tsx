import React, { useEffect } from "react";
import { Info } from "../../../types/group";
import kakao from "../../../assets/modal/kakaotalk.png";
declare global {
  interface Window {
    Kakao: any;
  }
}
interface GroupInfoProps {
  clubInfo?: Info;
}

export const KakaoShare = ({ clubInfo }: GroupInfoProps) => {
  useEffect(() => {
    console.log(window.Kakao);
    createKakaoButton();
  }, []);

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
          description: "안녕하세요",
          imageUrl: clubInfo?.thumbnailUrl, // i.e. process.env.FETCH_URL + '/logo.png'
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        social: {
          likeCount: 77,
          commentCount: 55,
          sharedCount: 333,
        },
        buttons: [
          {
            title: "Buddiary 참여하기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
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
      <button onClick={createKakaoButton} id="kakao-link-btn">
        <img src={kakao} alt="kakao-share-icon" />
      </button>
    </div>
  );
};
