import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { GiCancel } from "react-icons/gi"


interface Props {
    originFiles: File[];
    setOriginFiles: React.Dispatch<React.SetStateAction<File[]>>;
  }

export default function GroupPicture({ originFiles, setOriginFiles  }: Props) {
    const [photoList, setPhotoList] = useState(originFiles);
    useEffect(() => {
        console.log(photoList);
      }, [photoList]);
      useEffect(() => {
        setPhotoList(originFiles);
      }, [originFiles]);
    return (    <>
        <Swiper
          slidesPerView={3}
          spaceBetween={50}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
        >
          {photoList.map((file, index) => (
            <SwiperSlide
              key={index}
              style={{ display: "flex", justifyContent: "center", alignItems: "center" , minWidth: "250px" }}
            >
              <img
                src={URL.createObjectURL(file)}
                alt={"사진"}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </SwiperSlide>
            
          ))}
        </Swiper>
      </>
    
  )
}
