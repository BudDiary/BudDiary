import React, {useEffect} from 'react'
import { getDateDiaryListAPI } from '../../apis/diaryApi';

export default function ViewDiariesPage() {
  useEffect(() => {
    async function fetchData() {
      const currentUrl: string = window.location.href;
      const thisDate: string = currentUrl.slice(-10);
      console.log(thisDate)
      getDateDiaryListAPI(thisDate);
    }
    fetchData();
  }, []);
  return (
    <div>ViewDiariesPage</div>
  )
}
