import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import useObjectURL from "use-object-url";

import CropImagePanel from "./CropImagePanel";
import { getCroppedFile, limitImageSize } from "./utils";

export default function CropImageModal({
  show,
  imageFile,
  value, // crop value
  onChange, // on crop value change
  onConfirm, // (croppedFile) => void
  onCancel, // void => void
  onRemove, // void => void
  inputOptions = {}, // {maxWidth, maxHeight, mimeType, quality}
  cropOptions = {}, // {aspect, maxZoom}
  outputOptions = {}, // {maxWidth, maxHeight, mimeType, quality}
  displayOptions = {} // {title, removeButtonText, confirmButtonText, showRemoveButton, showConfirmButton}
}) {
  const {
    maxWidth: inputMaxWidth = Infinity,
    maxHeight: inputMaxHeight = Infinity,
    mimeType: inputMimeType = "image/jpeg",
    quality: inputQuality
  } = inputOptions;

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
    confirmButtonText = "Confirm",
    showRemoveButton = true,
    showConfirmButton = true
  } = displayOptions;

  const imageUrl = useObjectURL(imageFile);

  const [resizedUrl, setResizedUrl] = useState();
  const [resizing, setResizing] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      setResizing(true);
      limitImageSize({
        imageUrl,
        maxWidth: inputMaxWidth,
        maxHeight: inputMaxHeight,
        mimeType: inputMimeType,
        quality: inputQuality
      })
        .then(url => setResizedUrl(url))
        .catch(err => console.error(err))
        .finally(() => setResizing(false));
    } else {
      setResizedUrl();
    }
  }, [imageUrl]);

  const cropResultRef = useRef();

  function handleCropComplete(croppedArea, croppedAreaPixels) {
    cropResultRef.current = { croppedArea, croppedAreaPixels };
  }

  function handleConfirm() {
    getCroppedFile(
      resizedUrl,
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
      <Modal.Body style={{ height: "50vh" }}>
        {resizing && (
          <div className="d-flex justify-content-center align-items-center h-100">
            <Spinner animation="grow" />
          </div>
        )}
        {resizedUrl && (
          <CropImagePanel
            imageUrl={resizedUrl}
            value={value}
            onChange={onChange}
            onCropComplete={handleCropComplete}
            aspect={aspect}
            maxZoom={maxZoom}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        {showRemoveButton && (
          <Button variant="danger" className="mr-auto" onClick={onRemove}>
            {removeButtonText}
          </Button>
        )}
        {showConfirmButton && (
          <Button variant="primary" onClick={handleConfirm}>
            {confirmButtonText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
