import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAppDispatch } from "../../../redux/store";
import { jwtDecode } from "jwt-decode";
import ItemImages from "./itemImages";
import { addCarAss } from "../../../redux/slice/carAssSlice";

interface FileWithPreview extends File {
  previewUrl?: string;
}

interface JwtPayload {
  UserInfo?: {
    _id: string;
  };
}

const AddCarAss: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const accessToken: string | null = localStorage.getItem("accessToken");

  const decodedToken: JwtPayload | null = accessToken
    ? jwtDecode<JwtPayload>(accessToken)
    : null;

  const userId: string | undefined = decodedToken?.UserInfo?._id;

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);

  const handleOpenPopUp = () => setIsPopUpOpen(true);
  const handleClosePopUp = () => setIsPopUpOpen(false);

  const handleItemNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(event.target.value);
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

  const handleDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const onAdd = () => {
    if (!itemName || !description || selectedFiles.length === 0) {
      toast.error("Please input all fields");
    } else {
      handleClosePopUp();

      if (userId) {
        const parsedQuantity = quantity !== "" ? parseInt(quantity) : 1;
        const parsedDiscount = discount !== "" ? parseInt(discount) : 0;
        const parsedPrice = price !== "" ? parseInt(price) : 0;

        dispatch(
          addCarAss({
            userId,
            extra: {
              navigate,
            },
            selectedFiles,
            item: {
              itemName,
              description,
              discount: parsedDiscount,
              price: parsedPrice,
              quantity: parsedQuantity,
              _id: "",
              itemImage: [""],
              createdAt: "",
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
            className="absolute top-0 right-0 text-xl bg-black rounded-full px-3 pb-1 cursor-pointer text-white"
            onClick={handleClosePopUp}
          >
            x
          </p>
          <div className="flex flex-col overflow-auto h-[90vh] gap-5 bg-slate-600 py-5 px-5 md:px-20">
            <div className="flex items-center gap-2">
              <label className="font-bold text-sm">
                Name: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="ItemName"
                placeholder="Name of Item"
                value={itemName}
                onChange={handleItemNameChange}
                className="px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <ItemImages
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
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
                placeholder="Enter price"
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

            <div className="flex flex-col gap-2">
              <label className="font-bold mb-1">
                Car Description
                <span className="text-red-500">*</span>
              </label>

              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                id="carDescription"
                placeholder="Enter Item description..."
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

export default AddCarAss;
