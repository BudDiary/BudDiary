import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { GiCancel } from "react-icons/gi";

interface Props {
  originFiles: File[];
  setOriginFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function Pictures({ originFiles, setOriginFiles }: Props) {
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
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
      >
        {photoList.map((file, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "250px",
              position: "relative",
            }}
          >
            <img
              src={URL.createObjectURL(file)}
              alt={"사진"}
              className="px-8"
              style={{
                maxWidth: "250px",
                maxHeight: "250px",
                minWidth: "250px",
                minHeight: "250px",
              }}
            />
            <div className="absolute right-0 top-4">
              <GiCancel
                style={{
                  width: "40px",
                  height: "40px",
                  transform: "translateX(-50%)",
                }}
                color="red"
                min={500}
                onClick={() => handleDelete(index)}
              ></GiCancel>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
