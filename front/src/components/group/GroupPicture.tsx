import React from 'react';

interface GroupPictureProps {
  image: string | null;
}

const GroupPicture: React.FC<GroupPictureProps> = ({ image }) => {
  return (
    <div>
      {image ? (
        <img src={image} alt="group" style={{ maxWidth: "100%", maxHeight: "100%" }}/>
      ) : (
        <img src={require(`../../assets/group/GroupImage.png`)} alt="group"/>
        )}
    </div>
  );
};

export default GroupPicture;
