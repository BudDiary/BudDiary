import React, {useState, useEffect} from 'react';
import ReactWordcloud from 'react-wordcloud';
import useMember from "../../hooks/memberHook";
import { postWordCloudApi } from '../../apis/userApi';

interface WordCloud {
  text: string;
  value: number;
}



export default function Stat() {
  const { memberData } = useMember();
  const [words, setWords] = useState<WordCloud[]>([]);
  useEffect(() => {
    postWordCloudApi({ userId: memberData.username })
    .then((result) => {
      if (!result.error) {
        // console.log(result, 'this is wordcloud')
        setWords(result);
      } else {
        console.error(result.error); // Optionally, log the error
      }
    })
    .catch((error) => {
      console.error(error); // Log any unhandled promise rejections
    });
}, []);

return (
  <>
    {words.length > 0 && <ReactWordcloud words={words} />}
  </>
);

}
