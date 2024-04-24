import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { NewCar } from "../../../types";

const NewCarDetailsImages = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const newCar = useSelector(
    (state: RootState) => state.newCar.oneNewCarData as NewCar
  );

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div>
      <div className="mx-2 bg-gray-200 px-2 py-6">
        <div className=" mb-6 text-center">
          <h2 className="font-bold text-lg">Images of {newCar.carName}</h2>
          <h5 className="text-sm italic">Click Image to preview</h5>
        </div>
        <div className="flex flex-wrap gap-7 justify-center">
          {newCar?.carImage &&
            newCar?.carImage.map((img, index) => (
              <img
                src={img}
                alt={img}
                key={index + img}
                className="w-[200px] h-[200px] rounded-lg cursor-pointer hover:opacity-70"
                onClick={() => handleImageClick(img)}
              />
            ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
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

export default NewCarDetailsImages;