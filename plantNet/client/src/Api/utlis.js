export const imageUploadURL = async (imageDataUrl) => {
  if (!imageDataUrl) return;
  const imageData = new FormData();
  imageData.append("file", imageDataUrl);
  imageData.append("upload_preset", "planet_net_image");
  imageData.append("cloud_name", "diapxmnih");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/diapxmnih/image/upload",
    {
      method: "POST",
      body: imageData,
    }
  );

  const uploadImage = await res.json();
  return uploadImage.url;
};
