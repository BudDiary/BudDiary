import React, { useState, useRef } from 'react';
import { InputImage } from './AddGroupPicture.styles'
import Button from '@mui/material/Button';
interface AddGroupPictureProps {
  setImage: (image: string | null) => void;
}

const AddGroupPicture: React.FC<AddGroupPictureProps> = ({ setImage }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result?.toString() ?? null);
      };
      reader.readAsDataURL(selectedImage);
      setImageFile(selectedImage);
    }
  };

  return (
    <div>
        <Button onClick={handleButtonClick} variant="outlined">사진 첨부</Button>
      
<InputImage
        onChange={handleImageChange}
        ref={inputRef}/>
    </div>
  );
};

export default AddGroupPicture;
