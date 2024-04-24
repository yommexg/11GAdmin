import { useNavigate } from "react-router-dom";

import { NewCar as NewCarType } from "../../../types";
import { useAppDispatch } from "../../redux/store";
import { getOneNewCar } from "../../redux/slice/newCarSlice";

const NewCar: React.FC<{ item: NewCarType }> = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOneCarDetails = async () => {
    if (item._id) {
      await dispatch(
        getOneNewCar({
          newCarId: item?._id,
          extra: {
            navigate,
          },
        })
      );
    }
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="mb-4">
        <img
          src={item?.carImage && item?.carImage[0]}
          alt={item?.carName}
          className="w-[250px]"
        />
      </div>
      <div className="flex items-center flex-wrap justify-between gap-3 px-2 w-[250px]">
        <h2
          className="font-bold uppercase"
          style={{
            color: item?.carColor,
          }}
        >
          {item?.carColor} {""} {item.carName}
        </h2>
        <p className="text-blue-700 italic text-lg font-semibold">
          &#8358;{item?.price}
        </p>
      </div>

      <button
        onClick={handleOneCarDetails}
        className="mx-4 mt-4 bg-black py-2 px-4 text-white hover:opacity-70"
      >
        View Details
      </button>
    </div>
  );
};

export default NewCar;
