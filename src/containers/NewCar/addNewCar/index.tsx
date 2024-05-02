import { useState } from "react";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import SelectCarBrand from "./selectCarBrand";
import SelectCarYear from "./selectCarYear";
import SelectGear from "./selectGear";
import SelectFuel from "./selectFuel";
import SelectEngine from "./selectEngine";
import SelectColor from "./selectCarColor";
import CarImages from "./carImages";

import { carBrands } from "../../../utils/carBrands";
import { RootState, useAppDispatch } from "../../../redux/store";
import { addNewCar } from "../../../redux/slice/newCarSlice";
import { jwtDecode } from "jwt-decode";
import Spinner from "../../../components/Spinner";

interface FileWithPreview extends File {
  previewUrl?: string;
}

interface JwtPayload {
  UserInfo?: {
    _id: string;
  };
}

const AddNewCar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loadingNewCars = useSelector(
    (state: RootState) => state.newCar.loading
  );

  const accessToken: string | null = localStorage.getItem("accessToken");

  const decodedToken: JwtPayload | null = accessToken
    ? jwtDecode<JwtPayload>(accessToken)
    : null;

  const userId: string | undefined = decodedToken?.UserInfo?._id;

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [carName, setCarName] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedYear, setSelectedYear] = useState<number>(NaN);
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");

  const [selectedGearType, setSelectedGearTYpe] = useState("");
  const [selectedEngineType, setSelectedEngineType] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");

  const [engineNumber, setEngineNumber] = useState("");
  const [description, setDescription] = useState("");
  const [carColor, setCarColor] = useState("");

  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);

  const handleOpenPopUp = () => setIsPopUpOpen(true);
  const handleClosePopUp = () => setIsPopUpOpen(false);

  const handleCarNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCarName(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPrice(value);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuantity(value);
  };

  const handleDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDiscount(value);
  };

  const handleEngineNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEngineNumber(event.target.value);
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const onAdd = () => {
    if (
      !carName ||
      !carColor ||
      !carBrands ||
      !price ||
      !selectedYear ||
      !selectedFuelType ||
      !selectedGearType ||
      !engineNumber ||
      !selectedEngineType ||
      !description ||
      selectedFiles.length === 0
    ) {
      toast.error("Please input all fields");
    } else {
      handleClosePopUp();

      if (userId) {
        const parsedQuantity = quantity !== "" ? parseInt(quantity) : 0;
        const parsedDiscount = discount !== "" ? parseInt(discount) : 0;
        const parsedPrice = price !== "" ? parseInt(price) : 0;

        dispatch(
          addNewCar({
            userId,
            extra: {
              navigate,
            },
            selectedFiles,
            car: {
              carName,
              carColor,
              carBrand: selectedBrand,
              price: parsedPrice,
              quantity: parsedQuantity,
              description,
              gearType: selectedGearType,
              energyType: selectedFuelType,
              engineNumber,
              engineType: selectedEngineType,
              _id: "",
              carImage: [""],
              createdAt: "",
              year: selectedYear,
              discount: parsedDiscount,
              status: 10,
            },
          })
        );
      }
    }
  };
  return (
    <div>
      <FaPlus
        size={37}
        className="cursor-pointer bg-black text-white p-2"
        onClick={handleOpenPopUp}
      />
      {isPopUpOpen && (
        <div className="fixed top-0 left-0 w-full h-full   bg-gray-700 bg-opacity-95 z-50 flex justify-center items-center">
          <p
            className="absolute top-2 right-1 text-3xl bg-black rounded-full px-4 pb-2 cursor-pointer text-white"
            onClick={handleClosePopUp}
          >
            x
          </p>
          <div className="flex flex-col overflow-auto h-[90vh] gap-5 bg-slate-600 py-5 px-5 md:px-20">
            {loadingNewCars && <Spinner />}
            <div className="flex items-center gap-2">
              <label className="font-bold text-sm">
                Name: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="carName"
                placeholder="Generic Car Name"
                value={carName}
                onChange={handleCarNameChange}
                className="px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <CarImages
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
            />

            <SelectColor
              selectedColor={carColor}
              setSelectedColor={setCarColor}
            />

            <SelectCarBrand
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
            />
            <SelectCarYear
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
            <div className="flex items-center gap-2">
              <label className="font-bold mb-1">
                Price: <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={handlePriceChange}
                placeholder="Enter price of Car"
                className="w-40 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="font-bold mb-1">Quantity: </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                placeholder="Enter quantity"
                className="w-40 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="font-bold mb-1">Discount: </label>
              <input
                type="number"
                min="0"
                max="100"
                value={discount}
                onChange={handleDiscountChange}
                placeholder="Enter discount %"
                className="w-40 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <SelectGear
              selectedGearType={selectedGearType}
              setSelectedGearType={setSelectedGearTYpe}
            />
            <SelectFuel
              selectedFuelType={selectedFuelType}
              setSelectedFuelType={setSelectedFuelType}
            />

            <div className="flex items-center gap-2">
              <label className="font-bold mb-1">
                Engine Number: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="engineNumber"
                value={engineNumber}
                placeholder="Enter Engine No"
                onChange={handleEngineNumberChange}
                className="px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <SelectEngine
              selectedEngine={selectedEngineType}
              setSelectedEngine={setSelectedEngineType}
            />

            <div className="flex flex-col gap-2">
              <label className="font-bold mb-1">
                Car Description
                <span className="text-red-500">*</span>
              </label>

              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                id="carDescription"
                placeholder="Enter car description..."
                value={description}
                onChange={handleDescChange}
                rows={5}
              />
            </div>
            <button
              className="bg-black text-white py-2 hover:opacity-70"
              onClick={onAdd}
            >
              Add Car
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewCar;
