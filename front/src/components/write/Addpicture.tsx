import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { PostingTabType } from "../../types/write";
import { v4 } from "uuid";
// s3에 업로드할 이미지 ID 생성용 v4
// S3 구현되면 S3에 이미지 업로드하는 코드 추가할 예정

interface Props {
  setTab: React.Dispatch<React.SetStateAction<PostingTabType>>;
  setOriginFiles: React.Dispatch<React.SetStateAction<File[]>>;
  originFiles: File[];
}

export default function Addpicture({
  setTab,
  originFiles,
  setOriginFiles,
}: Props) {
  const fileTypes = ["png", "jpeg", "jpg"];
  const imageRegistHandler = (files: File[]) => {
    let tempImagelist = [...originFiles];
    for (let i = 0; i < files.length; i++) {
      const oldFile = files[i];
      const newName = v4();
      const newFile = new File([oldFile], newName + ".png", {
        type: oldFile.type,
      });
      tempImagelist.push(newFile);
    }
    setOriginFiles(tempImagelist);
    setTab("WRITE_CONTENT");
  };
  return (
    <div className = 'bg-red-800 flex justify-center'>
    <FileUploader
    handleChange={imageRegistHandler}
    name='file'
    types={fileTypes}
    multiple={true}
    hoverTitle='놓아주세요'
  >
    <button type='button'>
      <img
        // src={require(`@/assets/home/icon_photo.png`)}
        alt='AddPhotoAlternateIcon'
      />
    </button>
  </FileUploader>
  </div>
  );
}
