import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { NewCar as NewCarType } from "../../../types";
import { useAppDispatch } from "../../redux/store";
import { getOneNewCar } from "../../redux/slice/newCarSlice";

interface JwtPayload {
  UserInfo?: {
    _id: string;
  };
}

const NewCar: React.FC<{ item: NewCarType }> = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const accessToken: string | null = localStorage.getItem("accessToken");
  const decodedToken: JwtPayload | null = accessToken
    ? jwtDecode<JwtPayload>(accessToken)
    : null;
  const userId: string | undefined = decodedToken?.UserInfo?._id;

  const handleOneCarDetails = async () => {
    if (item._id && userId) {
      await dispatch(
        getOneNewCar({
          userId,
          newCarId: item?._id,
          extra: {
            navigate,
          },
        })
      );
    }
  };

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(item?.price);

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
            color: item?.carColor === "white" ? "black" : item?.carColor,
          }}
        >
          {item?.carColor} {""} {item.carName}
        </h2>
        <p className="text-blue-700 italic text-lg font-semibold">
          {formattedPrice}{" "}
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
