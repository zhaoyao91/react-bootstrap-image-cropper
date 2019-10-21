// 以下工具部分复制自 https://codesandbox.io/s/q8q1mnr01w
// 略有修改

export async function createImageDomFromUrl(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", error => reject(error));
    image.src = url;
  });
}

export async function limitImageSize({
  imageUrl,
  maxWidth,
  maxHeight,
  mimeType,
  quality
}) {
  const image = await createImageDomFromUrl(imageUrl);

  if (image.width <= maxWidth && image.height <= maxHeight) {
    return imageUrl;
  }

  const { width, height } = limitSize(
    image.width,
    image.height,
    maxWidth,
    maxHeight
  );

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL(mimeType, quality);
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {string} imageUrl - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} maxWidth
 * @param {number} maxHeight
 * @param {string} mimeType
 * @param {number} quality
 */
export async function getCroppedFile(
  imageUrl,
  pixelCrop,
  maxWidth,
  maxHeight,
  mimeType,
  quality
) {
  const { width, height } = limitSize(
    pixelCrop.width,
    pixelCrop.height,
    maxWidth,
    maxHeight
  );

  const image = await createImageDomFromUrl(imageUrl);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    width,
    height
  );

  return new Promise(resolve => {
    canvas.toBlob(resolve, mimeType, quality);
  });
}

function limitSize(width, height, maxWidth, maxHeight) {
  const widthRatio = width / maxWidth;
  const heightRation = height / maxHeight;
  const maxRation = Math.max(widthRatio, heightRation);
  if (maxRation > 1) {
    return {
      width: width / maxRation,
      height: height / maxRation
    };
  } else {
    return { width, height };
  }
}
