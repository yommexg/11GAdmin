import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { FaArrowCircleLeft } from "react-icons/fa";

import { RootState, useAppDispatch } from "../../redux/store";
import { NewCar } from "../../../types";
import { getOneNewCar } from "../../redux/slice/newCarSlice";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { statusColor, statusImage, statusName } from "../../utils/carStatus";
import NewCarDetailsImages from "./newCarDetailsImages";
import OtherNewCarDetails from "./otherNewCarDetails";
import NewCarButtons from "./newCarButtons";

interface JwtPayload {
  UserInfo?: {
    _id: string;
  };
}

const NewCarDetails: React.FC = () => {
  const { newCarId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const accessToken: string | null = localStorage.getItem("accessToken");
  const decodedToken: JwtPayload | null = accessToken
    ? jwtDecode<JwtPayload>(accessToken)
    : null;
  const userId: string | undefined = decodedToken?.UserInfo?._id;

  const newCar = useSelector(
    (state: RootState) => state.newCar.oneNewCarData as NewCar
  );

  useEffect(() => {
    if (newCarId && userId) {
      dispatch(
        getOneNewCar({
          userId,
          newCarId,
          extra: {
            navigate,
          },
        })
      );
    }
  }, [newCarId, dispatch, navigate, userId]);

  return (
    <div className="mb-3 ">
      <Sidebar />
      <Navbar />
      {newCar && (
        <div className="md:ml-[250px]">
          <div className="overflow-y-auto h-[80vh]">
            <div className=" mb-2 px-4 py-3 md:py-6 md:px-8 flex lg:px-15 items-center justify-between gap-2 bg-white shadow-2xl">
              <FaArrowCircleLeft
                size={24}
                onClick={() => navigate("/new-cars")}
                className="cursor-pointer"
              />
              <h2
                className="font-bold text-sm sm:text-base uppercase md:text-lg text-center"
                style={{
                  color:
                    newCar?.carColor === "white" ? "black" : newCar?.carColor,
                }}
              >
                {newCar?.carColor} {""} {newCar.carName}
              </h2>
              <div className="flex items-center gap-1">
                <img
                  src={statusImage[newCar.status as number]}
                  alt=""
                  className="md:w-6 md:h-6 w-4 h-4"
                />
                <p
                  className="font-semibold text-sm sm:text-base"
                  style={{ color: statusColor[newCar.status as number] }}
                >
                  {statusName[newCar.status as number]}
                </p>
              </div>
            </div>
            <OtherNewCarDetails />
            <NewCarDetailsImages />
            <div className="mx-2 bg-gray-200 px-2 py-6">
              <h3 className="text-center font-bold text-lg">Car Description</h3>
              <p className="text-center">{newCar?.description}</p>
            </div>

            <NewCarButtons />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCarDetails;
