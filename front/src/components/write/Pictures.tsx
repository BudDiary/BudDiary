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

export default function Pictures({ originFiles, setOriginFiles  }: Props) {
  const [photoList, setPhotoList] = useState(originFiles);
  useEffect(() => {
    console.log(photoList);
  }, [photoList]);
  const handleDelete = (index: number) => {
    const newList = [...photoList];
    newList.splice(index, 1);
    setPhotoList(newList);
    setOriginFiles(newList);
  };

  useEffect(() => {
    setPhotoList(originFiles);
  }, [originFiles]);

  return (
    <>
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
            <div>
              <GiCancel color="red" min={500} onClick={() => handleDelete(index)}></GiCancel>
            </div>
          </SwiperSlide>
          
        ))}
      </Swiper>
    </>
  );
}
