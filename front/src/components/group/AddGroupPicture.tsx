import React, { useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { UploadImageBox } from "./AddGroupPicture.styles";
import { v4 } from "uuid";
import { MdLibraryAdd } from "react-icons/md";

interface Props {
  setOriginFiles: React.Dispatch<React.SetStateAction<File[]>>;
  originFiles: File[];
}

export default function AddGroupPicture({ originFiles, setOriginFiles }: Props) {
  
    useEffect(() => {
        console.log("The state of originFiles has changed: ", originFiles);
      }, [originFiles]);

  const fileTypes = ["png", "jpeg", "jpg"];
  const imageRegistHandler = (files: File[]) => {
    if (files.length > 0) {
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
    }
  };
  return (
    <UploadImageBox>
      <FileUploader
        handleChange={imageRegistHandler}
        name="file"
        types={fileTypes}
        multiple={true}
        hoverTitle="놓아주세요"
      >
        <button>
          <MdLibraryAdd color="blue" size={32} />
        </button>
      </FileUploader>
    </UploadImageBox>
  );
}