import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { FaArrowCircleLeft } from "react-icons/fa";

import { RootState, useAppDispatch } from "../../redux/store";
import { UsedCar } from "../../../types";
import { getOneUsedCar } from "../../redux/slice/usedCarSlice";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { statusColor, statusImage, statusName } from "../../utils/carStatus";
import UsedCarAddress from "./usedCarAddress";
import OtherUsedCarDetails from "./otherUsedCarDetails";
import UsedCarDetailsImages from "./usedCarDetailsImage";
import UsedCarButtons from "./usedCarButton";

interface JwtPayload {
  UserInfo?: {
    _id: string;
  };
}

const UsedCarDetails: React.FC = () => {
  const { usedCarId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const accessToken: string | null = localStorage.getItem("accessToken");
  const decodedToken: JwtPayload | null = accessToken
    ? jwtDecode<JwtPayload>(accessToken)
    : null;
  const userId: string | undefined = decodedToken?.UserInfo?._id;

  const usedCar = useSelector(
    (state: RootState) => state.usedCar.oneUsedCarData as UsedCar
  );

  useEffect(() => {
    if (usedCarId && userId) {
      dispatch(
        getOneUsedCar({
          userId,
          usedCarId,
          extra: {
            navigate,
          },
        })
      );
    }
  }, [usedCarId, dispatch, navigate, userId]);

  return (
    <div className="mb-3">
      <Sidebar />
      <Navbar />
      {usedCar && (
        <div className="md:ml-[250px]">
          <div className="overflow-y-auto h-screen">
            <div className=" mb-2 px-4 py-3 md:py-6 md:px-8 flex lg:px-15 items-center justify-between gap-2 bg-white shadow-2xl">
              <FaArrowCircleLeft
                size={24}
                onClick={() => navigate("/used-cars")}
                className="cursor-pointer"
              />
              <h2
                className=" flex  items-center gap-1 font-bold text-sm sm:text-base uppercase md:text-lg text-center"
                style={{
                  color:
                    usedCar?.carColor === "white" ? "black" : usedCar?.carColor,
                }}
              >
                {usedCar?.carColor} {""} {usedCar.carName}{" "}
                <span className="text-[9px] md:text-xs lowercase text-gray-600">
                  (uploaded by user {usedCar?.user?.username})
                </span>
              </h2>
              <div className="flex items-center gap-1">
                <img
                  src={statusImage[usedCar.status as number]}
                  alt=""
                  className="md:w-6 md:h-6 w-4 h-4"
                />
                <p
                  className="font-semibold text-sm sm:text-base"
                  style={{ color: statusColor[usedCar.status as number] }}
                >
                  {statusName[usedCar.status as number]}
                </p>
              </div>
            </div>
            <div
              className="flex mx-2 gap-10
           bg-gray-200 px-2 py-6 justify-between md:px-10"
            >
              <UsedCarAddress />
              <OtherUsedCarDetails />
            </div>
            <UsedCarDetailsImages />
            <div className="mx-2 bg-gray-200 px-2 py-6">
              <h3 className="text-center font-bold text-lg">Car Description</h3>
              <p className="text-center text-xs md:text-base">
                {usedCar?.description}
              </p>
            </div>

            <UsedCarButtons />
          </div>
        </div>
      )}
    </div>
  );
};

export default UsedCarDetails;
