import React from 'react';
import ReactWordcloud from 'react-wordcloud';

export default function Stat() {
  const words = [
    {
      // text: '진짜 하루종일 잔 하루였다. 어제 여경언니랑 술을 마셨는데 집에 안가려고해서 죽는 줄 알았다. 집 오자마자 이닦고 잤는데 눈부셔서 일어났더니 7시반이었다. 주말인데 7시 기상은 에바지~~~ 그래서 화장실갔다가 문 앞에서 바로 누워서 잤다자면서 조금 더웠는데 현관 앞 너무 시원하고... 편안하고....하튼 그래서 다시 잤는데 12시반에 일어났다그리고 나서 오랜만에 밀린 포켓몬고를 했다 달콤아라는 애가 데뷔(?)해서 열심히 한거였는데 귀여웠다... 너무... 귀여워 해장을 해야될 것 같아서 국밥을 배달시키려고했는데 갑자기 귀찮아져서 편의점가서 사골곰탕을 사와서 먹었다 mm~ 존맛 역시 해장에는 사골곰탕이다 원래 오늘은 ncs를 시작해야되는 날이긴 했는데... um.... 오후에 또 꿀잠을 잤다 ㅄ인가....? (맞음) 뭔가 프젝 관련해서 뭔가를 해보려고했는데 아이디어도 시원찮고,,, 뭐 어째야될지 모르겠고,,, 서터레스받고,.,, 눈물나고,,,(사실안남) 그래서 그냥... 하루종일 논 하루였다 이런 날도 있어야지 ㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅎㅋㅋㅎㅋㅎㅋㅎ 뭐 쨌든 내일은 정처기 실기를 보는 여경언니, 지애언니랑 군산 사는 준영오빠랑 넷이 해서 군산에서 놀기로했다 이성당 너무 기대돼,,, 그리고 짚라인이 있다고 했던 것 같은데 그것 또한 기대된다 근데 그건 안탈수도...? 뭐 어쨌든 군산 한번도 안가봐서 제법 기대된다 나는 정말... 노답 하루를 보냈는데 내 일기 교환상대는 어떤 하루를 보냈을까? 정말 궁금하다',
      text: '진짜',
      value: 64,
    },
    {
      text: '하루',
      value: 11,
    },
    {
      text: '종일',
      value: 16,
    },
    {
      text: '잔',
      value: 17,
    },
  ]
  
  return (
    <ReactWordcloud words={words} />
  )
}
