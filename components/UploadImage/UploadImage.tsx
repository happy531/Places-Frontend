import React, { ChangeEvent } from "react";
import Image from "next/image";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { CardContent, Fab, Grid } from "@mui/material";

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
        <div
          style={{
            borderRadius: "10px",
            width: 500,
            height: 400,
            overflow: "hidden",
          }}
        >
          <Image
            alt="your image"
            width={500}
            height={400}
            src={URL.createObjectURL(selectedImage)}
            onClick={() => onSetSelectedImage(null)}
          />
        </div>
      )}
      {!selectedImage && (
        <>
          <CardContent>
            <Grid container>
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
