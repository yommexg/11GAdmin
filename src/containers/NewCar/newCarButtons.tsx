import { useSelector } from "react-redux";
import { useState, MouseEvent } from "react";

import { RootState, useAppDispatch } from "../../redux/store";
import { NewCar } from "../../../types";
import { statusColor, statusName } from "../../utils/carStatus";
import { jwtDecode } from "jwt-decode";
import { updateNewCarStatus } from "../../redux/slice/newCarSlice";
import { useNavigate } from "react-router-dom";

const carStatusOptions = ["Availiable", "Pending", "Sold Out"];

interface JwtPayload {
  UserInfo?: {
    _id: string;
  };
}

const NewCarButtons: React.FC = () => {
  const newCar = useSelector(
    (state: RootState) => state.newCar.oneNewCarData as NewCar
  );

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOpenPopUp = () => setIsPopUpOpen(true);
  const handleClosePopUp = () => setIsPopUpOpen(false);

  const handleStatusChange = async (event: MouseEvent<HTMLButtonElement>) => {
    handleClosePopUp();

    const accessToken: string | null = localStorage.getItem("accessToken");

    const decodedToken: JwtPayload | null = accessToken
      ? jwtDecode<JwtPayload>(accessToken)
      : null;

    const userId: string | undefined = decodedToken?.UserInfo?._id;

    const newStatus = (event.target as HTMLButtonElement).textContent;
    if (userId && newCar._id) {
      if (newStatus === "Availiable") {
        dispatch(
          updateNewCarStatus({
            carStatus: 1,
            newCarId: newCar._id,
            userId,
            extra: {
              navigate,
            },
          })
        );
      } else if (newStatus === "Pending") {
        dispatch(
          updateNewCarStatus({
            carStatus: 0,
            newCarId: newCar._id,
            userId,
            extra: {
              navigate,
            },
          })
        );
      } else if (newStatus === "Sold Out") {
        dispatch(
          updateNewCarStatus({
            carStatus: -1,
            newCarId: newCar._id,
            userId,
            extra: {
              navigate,
            },
          })
        );
      }
    }
  };

  return (
    <div className="flex justify-between mb-4">
      <button
        className="mx-2 px-4 text-xs bg-black text-white md:text-base font-bold py-4 my-4 rounded-xl"
        onClick={handleOpenPopUp}
      >
        Change Car Status
      </button>
      <button className="mx-2 px-4 text-xs rounded-xl bg-red-600 text-white md:text-base font-bold py-4 my-4">
        Delete This {newCar?.carName}
      </button>

      {isPopUpOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-200 bg-opacity-80 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-bold mb-2">Change Car Status</h3>
            <ul className="list-none">
              {carStatusOptions.map((status) => (
                <li key={status} className="mb-2">
                  <button
                    className="px-4 py-2 rounded-md text-left focus:outline-none hover:bg-gray-300"
                    style={{
                      color:
                        statusName[newCar.status as number] === status
                          ? statusColor[newCar.status as number]
                          : "",
                    }}
                    onClick={handleStatusChange}
                  >
                    {status}
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-black hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
              onClick={handleClosePopUp}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCarButtons;
