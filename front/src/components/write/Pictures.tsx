import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

interface Props {
  originFiles: File[];
}


export default function Pictures({ originFiles }: Props) {
  return (
    <>
    <Swiper
    pagination={{
      type: 'fraction',
    }}
    navigation={true}
    modules={[Pagination, Navigation]}
    
    >
    {originFiles.map((file, index) => (
      <SwiperSlide key={index}>
        <img src={URL.createObjectURL(file)} alt={'사진'} />
      </SwiperSlide>
    ))}
  </Swiper>
    </>
  );
}
