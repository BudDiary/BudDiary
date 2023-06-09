import React, { useRef, useState, useEffect } from "react";
import { ContentBox, StickerListTitle } from "./WritePage.styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import navimg from "../../assets/subnav/WirteDiary.jpg";
import interact from "interactjs";
import useMember from "../../hooks/memberHook";
import { PageContainer } from "../../components/common/Page.styles";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  postTodayDiaryApi,
  postSentimentApi,
  postKeywordApi,
} from "../../apis/diaryApi";
import { useNavigate } from "react-router-dom";
import { postLiveNewDiaryApi } from "../../apis/noticeApi";
import { getMyStickersApi } from "../../apis/stickerApi";
import { getStickerList } from "../../store/modules/member";

interface Props {
  setStage: React.Dispatch<React.SetStateAction<number>>;
  content: string;
  pics: any;
  groups: any;
  personal: boolean;
}

type usedSticker = {
  stickerUrl: any;
  xCoordinate: number;
  yCoordinate: number;
};

export default function StickerPage({
  setStage,
  content,
  pics,
  groups,
  personal,
}: Props) {
  const navigate = useNavigate();
  // 보낼 스티커 리스트 담는 useState
  const [sendStickerList, setSendStickerList] = useState<usedSticker[]>([]);
  const myStickers = useSelector((state: RootState) => state.member.memberData.sticker);

  // 드래그 시작될 때 실행
  const dispatch = useDispatch();

  const dragItem = useRef();
  const dragStart = (e: any, position: any) => {
    dragItem.current = position;
    e.target.classList.add("grabbing");
    console.log(dragItem.current, "드래그 시작할때");
  };


  // 드랍 (커서 뗐을 때)
  const drop = (e: any) => {
    e.target.classList.remove("grabbing");
    console.log(e, "????");
    console.log(e.screenX);
    console.log(e.screenY);
    const temp: usedSticker = {
      stickerUrl: e.target.src,
      xCoordinate: e.screenX,
      yCoordinate: e.screenY,
    };
    setSendStickerList([...sendStickerList, temp]);
  };
  // 내 아이디
  const { memberData } = useMember();
  const username = memberData.username;
  // 내가 소유한 스티커들. 리덕스에서 가져옴

  
  // 내 감정들
  const [sentiment, setSentiment] = useState<{
    negative: number;
    positive: number;
  }>({ negative: 0, positive: 0 });
  // 보낼 데이터
  const [data, setData] = useState<{
    text: string;
    fileList: [File] | null;
    clubList: any;
    isPersonal: boolean;
    memberUsername: string;
    negativeRate: number;
    positiveRate: number;
    stickerDtoList: any;
  }>({
    text: content,
    fileList: pics,
    clubList: groups,
    isPersonal: personal,
    memberUsername: username,
    negativeRate: 0,
    positiveRate: 0,
    stickerDtoList: [],
  });

  useEffect(() => {
    // fastapi에 보낼 데이터 저장
    setData((prevData) => ({
      ...prevData,
      negativeRate: sentiment.negative,
      positiveRate: sentiment.positive,
    }));
  }, [sentiment]);

  // 데이터 보내기
  const sendData = async () => {
    // 데이터 fastapi로 보내기
    await Promise.all([
      postSentimentApi({ content: content }),
      postKeywordApi({ userId: username, content: content }),
    ]).then(async ([result]) => {
      await setSentiment(result);
      // -------------------------------------------------------------------------------------------------------------
      // 폼데이터에 넣어서 axios
      const formData = new FormData();
      formData.append("text", content);
      // 여러 개의 파일 추가
      pics.forEach((p: any) => formData.append("fileList", p));

      formData.append("isPersonal", String(personal));
      // let stickerData: usedSticker[] = [];
      if (sendStickerList.length > 0) {
        for (let i = 0; i < sendStickerList.length; i++) {
          console.log(sendStickerList[i].stickerUrl);
          formData.append(
            `stickerDtoList[${i}].stickerUrl`,
            String(sendStickerList[i].stickerUrl)
          );
          formData.append(
            `stickerDtoList[${i}].xCoordinate`,
            String(sendStickerList[i].xCoordinate)
          );
          formData.append(
            `stickerDtoList[${i}].yCoordinate`,
            String(sendStickerList[i].yCoordinate)
          );
        }
      }
      formData.append("negativeRate", result.negative);
      formData.append("positiveRate", result.positive);
      if (groups.length > 0) {
        for (let i = 0; i < groups.length; i++) {
          formData.append(`clubList[${i}]`, groups[i]);
        }
      }

      // let entries = formData.entries();
      // for (const pair of entries) {
      //   console.log(pair[0] + ", " + pair[1], "하이잉이이이이");
      // }
      postTodayDiaryApi(formData)
        .then(async () => {
          if (groups.length === 0) {
            navigate("/mypage");
          } else {
            console.log(groups, "여기로 알람 보내줘");
            // 일기 작성이 잘 되었다면
            // 구성원 모두한테 알람 보내기
            postLiveNewDiaryApi(groups);
            const sticker = await getMyStickersApi();
            dispatch(getStickerList(sticker));
            navigate(`/group/${groups[0]}`);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
      // let resultArray: string[] = [];
      // stickerData.forEach((element, index) => {
      //   const value1 = `stickerDtoList[${index}].stickerUrl: ${element.stickerUrl}`;
      //   resultArray.push(value1);
      //   const value2 = `stickerDtoList[${index}].xCoordinate: ${element.xCoordinate}`;
      //   resultArray.push(value2);
      //   const value3 = `stickerDtoList[${index}].yCoordinate: ${element.xCoordinate}`;
      //   resultArray.push(value3);
      // });
      // const updatedData = {
      //   ...data,
      //   negativeRate: result.negative,
      //   positiveRate: result.positive,
      //   stickerDtoList: stickerData,
      // };
      // ---------------------------------------------------------------------------------------------------------------------
      // return updatedData;
    });
    // .then((updatedData) => {
    //   console.log(updatedData, "진짜 보낼데이터터");
    //   // 스프링으로 데이터 보내기
    //   postTodayDiaryApi(updatedData)
    //     .then(() => {
    //       if (updatedData.clubList.length === 0) {
    //         navigate("/mypage");
    //       } else {
    //         // 일기 작성이 잘 되었다면
    //         // 구성원 모두한테 알람 보내기
    //         postLiveNewDiaryApi(updatedData.clubList);
    //         navigate("/group");
    //       }
    //     })
    //     .catch((error) => {
    //       console.log("Error:", error);
    //     });
    // });
  };

  return (
    <div className="relative">
      <PageContainer>
        <StickerListTitle>보유중인 스티커</StickerListTitle>
        {/* <StickerListContainer></StickerListContainer> */}
        {/* {myStickers && myStickers?.length > 0 && (
        <div className="flex overflow-x-scroll">
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            loop={true}
          >
            {myStickers.map((pic: any, index: any) => (
              <SwiperSlide key={index}>
                <img
                  src={pic.imgUrl}
                  alt="일기 사진입니다."
                  className="my-auto"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )} */}
        {sendStickerList.map((sticker, index) => (
          <img
            key={index}
            src={sticker.stickerUrl}
            style={{
              left: sticker.xCoordinate,
              top: sticker.yCoordinate - 180,
            }}
            className="absolute w-[192px]"
          />
        ))}
        <div className="grid grid-cols-6 h-[160px]">
          {myStickers &&
            myStickers.length > 0 &&
            myStickers.map((sticker, idx) => (
              <img
                src={sticker.sticker.imageUrl}
                // alt={String(sticker.sticker.stickerId)}
                className="sticker-item my-auto hover:cursor-pointer"
                draggable
                onDragStart={(e) => dragStart(e, idx)}
                onDragEnd={drop}
              />
            ))}
        </div>
        <ContentBox className="drop-container text-2xl font-hassam">
          {content}
        </ContentBox>
        <div className="flex justify-evenly">
          <button
            className="bg-gray-300 text-white w-[120px] h-[45px] rounded-md"
            onClick={() => setStage(0)}
          >
            이전
          </button>
          <button
            className="bg-bud-green text-white w-[120px] h-[45px] rounded-md"
            onClick={sendData}
          >
            완료
          </button>
        </div>
      </PageContainer>
    </div>
  );
}