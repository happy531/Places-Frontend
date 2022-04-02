import React, { ChangeEvent } from "react";
import Image from "next/image";

import { CardContent, Fab, Grid } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

interface Props {
  selectedImage: Blob | MediaSource;
  onSetSelectedImage: (file: File) => void;
  width: number;
  height: number;
}

const UploadImage: React.FC<Props> = ({
  selectedImage,
  onSetSelectedImage,
  width,
  height,
}) => {
  return (
    <>
      {selectedImage && (
        <div
          style={{
            borderRadius: "10px",
            width: width,
            height: height,
            marginLeft: "auto",
            marginRight: "auto",
            overflow: "hidden",
          }}
        >
          <Image
            alt="your image"
            width={width}
            height={height}
            src={URL.createObjectURL(selectedImage)}
            onClick={() => onSetSelectedImage(null)}
          />
        </div>
      )}
      {!selectedImage && (
        <>
          <CardContent>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  console.log(event.target.files[0]);
                  onSetSelectedImage(event.target.files[0]);
                }}
              />
              <label htmlFor="contained-button-file">
                <Fab component="span">
                  <AddPhotoAlternateIcon />
                </Fab>
              </label>
            </Grid>
          </CardContent>
        </>
      )}
    </>
  );
};

export default UploadImage;
