import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { FaArrowCircleLeft } from "react-icons/fa";

import { RootState, useAppDispatch } from "../../redux/store";
import { CarAss } from "../../../types";
import { getOneCarAss } from "../../redux/slice/carAssSlice";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { statusColor, statusImage, statusName } from "../../utils/carStatus";
import OtherCarAssDetails from "./otherCarAssDetails";
import CarAssDetailsImages from "./carAssDetailsImages";
import CarAssButtons from "./carAssButtons";
// import CarAssDetailsImages from "./CarAssDetailsImages";
// import OtherCarAssDetails from "./otherCarAssDetails";
// import CarAssButtons from "./CarAssButtons";

interface JwtPayload {
  UserInfo?: {
    _id: string;
  };
}

const CarAssDetails: React.FC = () => {
  const { carAssId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const accessToken: string | null = localStorage.getItem("accessToken");
  const decodedToken: JwtPayload | null = accessToken
    ? jwtDecode<JwtPayload>(accessToken)
    : null;
  const userId: string | undefined = decodedToken?.UserInfo?._id;

  const carAss = useSelector(
    (state: RootState) => state.carAss.oneCarAssData as CarAss
  );

  useEffect(() => {
    if (carAssId && userId) {
      dispatch(
        getOneCarAss({
          userId,
          carAssId,
          extra: {
            navigate,
          },
        })
      );
    }
  }, [carAssId, dispatch, navigate, userId]);

  return (
    <div className="mb-3 ">
      <Sidebar />
      <Navbar />
      {carAss && (
        <div className="md:ml-[250px]">
          <div className=" mb-2 px-4 py-3 md:py-6 md:px-8 flex lg:px-15 items-center justify-between gap-2 bg-white shadow-2xl">
            <FaArrowCircleLeft
              size={24}
              onClick={() => navigate("/car-ass")}
              className="cursor-pointer"
            />
            <h2 className="font-bold text-sm sm:text-base uppercase md:text-lg text-center">
              {carAss.itemName}
            </h2>
            <div className="flex items-center gap-1">
              <img
                src={statusImage[carAss.status as number]}
                alt=""
                className="md:w-6 md:h-6 w-4 h-4"
              />
              <p
                className="font-semibold text-sm sm:text-base"
                style={{ color: statusColor[carAss.status as number] }}
              >
                {statusName[carAss.status as number]}
              </p>
            </div>
          </div>
          <OtherCarAssDetails />
          <CarAssDetailsImages />
          <div className="mx-2 bg-gray-200 px-2 py-6">
            <h3 className="text-center font-bold text-lg">Item Description</h3>
            <p className="text-center">{carAss?.description}</p>
          </div>

          <CarAssButtons />
        </div>
      )}
    </div>
  );
};

export default CarAssDetails;
