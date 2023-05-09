import React, {useEffect, useState} from 'react'
import { getDateDiaryListAPI } from '../../apis/diaryApi';
import WrittenDiaryItem from '../../components/view/WrittenDiaryItem';


export default function ViewDiariesPage() {
  let [dateDiaries, setDateDiaries] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const currentUrl: string = window.location.href;
      const thisDate: string = currentUrl.slice(-10);
      const response = await getDateDiaryListAPI(thisDate, 'yeokyung502@naver.com');
      console.log(response, '잘왔네')
      setDateDiaries(response)
      
    }
    fetchData();
  }, []);
  return (
    <>
      {dateDiaries.map((diary: any) => {
        return <WrittenDiaryItem 
          key={diary.diaryInfo.diaryId} 
          type={diary.type}
          />
      })}
    </>
  )
}
