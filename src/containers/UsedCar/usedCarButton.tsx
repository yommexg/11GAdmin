import { useSelector } from "react-redux";
import { useState, MouseEvent } from "react";
import { jwtDecode } from "jwt-decode";

import { RootState, useAppDispatch } from "../../redux/store";
import { UsedCar } from "../../../types";
import { statusColor, statusName } from "../../utils/carStatus";
import {
  deleteUsedCar,
  updateUsedCarStatus,
} from "../../redux/slice/usedCarSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const carStatusOptions = ["Availiable", "Pending", "Sold Out", "Decline"];

interface JwtPayload {
  UserInfo?: {
    _id: string;
  };
}

const UsedCarButtons: React.FC = () => {
  const usedCar = useSelector(
    (state: RootState) => state.usedCar.oneUsedCarData as UsedCar
  );

  const [reason, setReason] = useState("");

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isDeclineReasonPopupOpen, setIsDeclineReasonPopupOpen] =
    useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOpenPopUp = () => setIsPopUpOpen(true);
  const handleClosePopUp = () => setIsPopUpOpen(false);

  const handleReasonChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReason(event.target.value);
  };

  const handleOpenDeletePopup = () => setIsDeletePopupOpen(true);
  const handleCloseDeletePopup = () => setIsDeletePopupOpen(false);

  const handleOpenDeclineReason = () => setIsDeclineReasonPopupOpen(true);
  const handleCloseDeclineReason = () => setIsDeclineReasonPopupOpen(false);

  const accessToken: string | null = localStorage.getItem("accessToken");

  const decodedToken: JwtPayload | null = accessToken
    ? jwtDecode<JwtPayload>(accessToken)
    : null;

  const userId: string | undefined = decodedToken?.UserInfo?._id;

  const handleStatusChange = async (event: MouseEvent<HTMLButtonElement>) => {
    handleClosePopUp();

    const usedStatus = (event.target as HTMLButtonElement).textContent;

    if (userId && usedCar._id) {
      if (usedStatus === "Availiable") {
        dispatch(
          updateUsedCarStatus({
            carStatus: 1,
            usedCarId: usedCar._id,
            userId,
            extra: {
              navigate,
            },
          })
        );
      } else if (usedStatus === "Pending") {
        dispatch(
          updateUsedCarStatus({
            carStatus: 0,
            usedCarId: usedCar._id,
            userId,
            extra: {
              navigate,
            },
          })
        );
      } else if (usedStatus === "Sold Out") {
        dispatch(
          updateUsedCarStatus({
            carStatus: -1,
            usedCarId: usedCar._id,
            userId,
            extra: {
              navigate,
            },
          })
        );
      } else if (usedStatus === "Decline") {
        handleOpenDeclineReason();
      }
    }
  };

  const handleDeclineStatus = async () => {
    if (!reason) {
      toast.error("Please Input Reason");
    }
    if (reason && userId) {
      handleCloseDeclineReason();
      await dispatch(
        updateUsedCarStatus({
          reason,
          carStatus: -2,
          usedCarId: usedCar._id,
          userId,
          extra: {
            navigate,
          },
        })
      );
      setReason("");
    }
  };

  const handleConfirmDelete = () => {
    handleCloseDeletePopup();
    if (userId && usedCar._id) {
      dispatch(
        deleteUsedCar({
          userId,
          usedCarId: usedCar._id,
          extra: {
            navigate,
          },
        })
      );
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
      <button
        onClick={handleOpenDeletePopup}
        className="mx-2 px-4 text-xs rounded-xl bg-red-600 text-white md:text-base font-bold py-4 my-4"
      >
        Delete This {usedCar?.carName}
      </button>

      {isDeletePopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-200 bg-opacity-90 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-bold mb-2">Confirm Delete</h3>
            <p>Are you sure you want to delete {usedCar.carName}?</p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
                onClick={handleCloseDeletePopup}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {isDeclineReasonPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-200 bg-opacity-90 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 shadow-md flex flex-col items-center">
            <h3 className="text-lg font-bold mb-2">
              Reason for Decline <span className="text-red-500">*</span>
            </h3>
            <textarea
              className="px-4 w-full bg-slate-200  py-2 rounded-md focus:outline-none focus:border-blue-500"
              rows={5}
              placeholder="Enter Reason for Decline"
              value={reason}
              onChange={handleReasonChange}
            />
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
                onClick={handleCloseDeclineReason}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
                onClick={handleDeclineStatus}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

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
                        statusName[usedCar.status as number] === status
                          ? statusColor[usedCar.status as number]
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

export default UsedCarButtons;
