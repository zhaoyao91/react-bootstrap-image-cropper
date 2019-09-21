import React from "react";
import { Button, Image } from "react-bootstrap";
import useObjectURL from "use-object-url";

export function InputButton({
  width,
  height,
  children = "Select Image",
  onClick
}) {
  return (
    <Button variant="light" onClick={onClick} style={{ width, height }}>
      {children}
    </Button>
  );
}

export function InputPreview({ width, height, imageFile, onClick }) {
  const url = useObjectURL(imageFile);
  return (
    <Image
      style={{ width, height, cursor: "pointer", objectFit: "contain" }}
      src={url}
      onClick={onClick}
    />
  );
}

export default function CropImageInput({
  imageFile,
  children,
  width,
  height,
  onClick
}) {
  if (imageFile) {
    return (
      <InputPreview
        imageFile={imageFile}
        width={width}
        height={height}
        onClick={onClick}
      />
    );
  } else {
    return (
      <InputButton
        children={children}
        width={width}
        height={height}
        onClick={onClick}
      />
    );
  }
}
