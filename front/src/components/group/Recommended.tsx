import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
export default function Recommended() {
  const [recommendList , setRecommendList] = useState([1, 2, 3, 4, 5]);
  const cards = [
    {
      id: 1,
      image: '/static/images/cards/contemplative-reptile.jpg',
      title: 'Lizard',
      description:
        '나와 87% 비슷한 사람이에요',
    },
    {
      id: 2,
      image: '/static/images/cards/contemplative-reptile.jpg',
      title: 'second',
      description:
        '나와 70% 비슷한 사람이에요',
    },
    {
      id: 3,
      image: '/static/images/cards/contemplative-reptile.jpg',
      title: 'third',
      description:
        '나와 50% 비슷한 사람이에요.',
    },
    {
      id: 4,
      image: '/static/images/cards/contemplative-reptile.jpg',
      title: 'fourth',
      description:
        '나와 35% 비슷한 사람이에요.',
    },
  ];
  

  return (
<>
<div>
<Typography variant="h5" component="h5">
        이런 사람과 교환일기를 작성해 보는 건 어떤가요?
      </Typography>
</div>
<br />
<Swiper
  slidesPerView={3}
  pagination={{ clickable: true }}>
  {cards.map((card) => (
    <SwiperSlide key={card.id}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 140 }} image={card.image} title={card.title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {card.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {card.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="large">
            그룹일기 신청하기
          </Button>
        </CardActions>
      </Card>
    </SwiperSlide>
  ))}
</Swiper>
  </>
  );
}

