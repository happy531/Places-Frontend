import React from "react";
import Image from "next/image";

interface Props {
  selectedImage: Blob | MediaSource;
  onSetSelectedImage: (file: File) => void;
}

const UploadImage: React.FC<Props> = ({
  selectedImage,
  onSetSelectedImage,
}) => {
  return (
    <>
      {selectedImage && (
        <div>
          <Image
            alt="your image"
            width={"150px"}
            height={"150px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => onSetSelectedImage(null)}>Remove</button>
        </div>
      )}
      {!selectedImage && (
        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            console.log(event.target.files[0]);
            onSetSelectedImage(event.target.files[0]);
          }}
        />
      )}
    </>
  );
};

export default UploadImage;
