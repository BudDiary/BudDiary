import React, { useEffect, useState } from "react";
import { getDateDiaryListApi } from "../../apis/diaryApi";
import WrittenDiaryItem from "../../components/view/WrittenDiaryItem";
import {
  PageContainer,
  SubNavContainer,
} from "../../components/common/Page.styles";
import navimg from "../../assets/subnav/View.jpg";

export default function ViewDiariesPage() {
  let [dateDiaries, setDateDiaries] = useState([]);
  // const [feelingEmoji, setFeelingEmoji] = userState(number)
  useEffect(() => {
    async function fetchData() {
      const currentUrl: string = window.location.href;
      const thisDate: string = currentUrl.slice(-10);
      const response = await getDateDiaryListApi(thisDate);
      setDateDiaries(response);
    }
    fetchData();
  }, []);


  return (
    <>
      <SubNavContainer img={navimg}>작성한 일기</SubNavContainer>
      <PageContainer>
        <div className="font-berry text-3xl mt-2 ml-[20px] sm:ml-0">
          {window.location.href.slice(-10)} 일기
        </div>
        {dateDiaries.length >= 1 ? (
          dateDiaries.map((diary: any) => {
            return (
              <WrittenDiaryItem
                key={diary.diaryInfo.diaryId}
                id={diary.diaryInfo.diaryId}
                type={diary.type}
                club={diary.clubInfo}
                pics={diary.diaryInfo.imgList}
                content={diary.diaryInfo.text}
                date={diary.diaryInfo.writeDate}
                negative={diary.diaryInfo.negativeRate}
                positive={diary.diaryInfo.positiveRate}
              />
            );
          })
        ) : (
          <div className="font-berry text-3xl mt-2">
            이 날은 일기를 작성하지 않았어요
          </div>
        )}
      </PageContainer>
    </>
  );
}
