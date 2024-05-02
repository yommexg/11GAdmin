import React, { useState } from "react";

interface CarImageProps {
  selectedFiles: FileWithPreview[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
}

interface FileWithPreview extends File {
  previewUrl?: string;
}

const CarImages: React.FC<CarImageProps> = ({
  selectedFiles,
  setSelectedFiles,
}) => {
  const [imageLimitMessage, setImageLimitMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const files = target.files as FileList;

    if (files.length > 4) {
      setImageLimitMessage("Error: You can only upload a maximum of 4 images.");
      target.value = ""; // Clear file selection if limit exceeded
      return;
    }

    setImageLimitMessage(""); // Reset error message

    const newSelectedFiles: FileWithPreview[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i] as FileWithPreview;
      const reader = new FileReader();

      reader.onload = (e) => {
        file.previewUrl = e.target!.result as string;
        newSelectedFiles.push(file);
        setSelectedFiles(newSelectedFiles);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (imageUrl: string | undefined) => {
    if (imageUrl) setSelectedImage(imageUrl);
  };

  const imagePreviews = selectedFiles.map((file) => (
    <div
      key={file.name}
      className="w-24 h-24 cursor-pointer rounded-lg overflow-hidden"
    >
      <img
        src={file.previewUrl!}
        alt={file.name}
        className="w-full h-full "
        onClick={() => handleImageClick(file.previewUrl)}
      />
    </div>
  ));

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="New Car" className="text-sm font-bold">
        Car Image (s): <span className="text-red-500">*</span>
        <span className="text-xs italic ml-1 text-gray-400">
          Image(s) must NOT be more than 5mb
        </span>
      </label>
      <input
        type="file"
        name="newCar"
        accept="image/*"
        multiple
        onChange={handleFileUpload}
        className="border rounded-md px-2 py-1"
      />
      <div className="flex flex-wrap gap-4">
        {imagePreviews[0]}
        {imagePreviews[1]}
        {imagePreviews[2]}
        {imagePreviews[3]}
      </div>
      {imagePreviews.slice(4)}

      {imageLimitMessage && <p className="text-red-500">{imageLimitMessage}</p>}
      {imagePreviews && selectedImage && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex justify-center items-center z-50 p-4">
          <img
            src={selectedImage}
            alt="Selected Car Image"
            className="max-w-screen max-h-screen object-contain"
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-0 right-2 bg-black px-3 py-1 rounded-full text-white text-xl hover:text-opacity-75"
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default CarImages;
