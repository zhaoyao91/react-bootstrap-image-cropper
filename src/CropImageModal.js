import React, { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import useObjectURL from "use-object-url";

import CropImagePanel from "./CropImagePanel";
import { getCroppedFile } from "./utils";

export default function CropImageModal({
  show,
  imageFile,
  value, // crop value
  onChange, // on crop value change
  onConfirm, // (croppedFile) => void
  onCancel, // void => void
  onRemove, // void => void
  cropOptions = {}, // {aspect, maxZoom}
  outputOptions = {}, // {maxWidth, maxHeight, mimeType, quality}
  displayOptions = {} // {title, removeButtonText, confirmButtonText}
}) {
  const { aspect, maxZoom } = cropOptions;

  const {
    maxWidth = Infinity,
    maxHeight = Infinity,
    mimeType = "image/jpeg",
    quality
  } = outputOptions;

  const {
    title = "Crop Image",
    removeButtonText = "Remove",
    confirmButtonText = "Confirm"
  } = displayOptions;

  const imageUrl = useObjectURL(imageFile);
  const cropResultRef = useRef();

  function handleCropComplete(croppedArea, croppedAreaPixels) {
    cropResultRef.current = { croppedArea, croppedAreaPixels };
  }

  function handleConfirm() {
    getCroppedFile(
      imageUrl,
      cropResultRef.current.croppedAreaPixels,
      maxWidth,
      maxHeight,
      mimeType,
      quality
    ).then(onConfirm);
  }

  return (
    <Modal show={show} onHide={onCancel} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ minHeight: "50vh" }}>
        {imageUrl && (
          <CropImagePanel
            imageUrl={imageUrl}
            value={value}
            onChange={onChange}
            onCropComplete={handleCropComplete}
            aspect={aspect}
            maxZoom={maxZoom}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" className="mr-auto" onClick={onRemove}>
          {removeButtonText}
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          {confirmButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
