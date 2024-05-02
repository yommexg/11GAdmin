import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { logoutAsync } from "../../redux/slice/logoutSlice";
import { useAppDispatch } from "../../redux/store";

const Logout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const handleOpenPopUp = () => setIsPopUpOpen(true);
  const handleClosePopUp = () => setIsPopUpOpen(false);

  const handleLogout = () => {
    dispatch(
      logoutAsync({
        extra: {
          navigate,
        },
      })
    );
  };

  return (
    <>
      <button
        className="bg-black m-5 px-5 py-2 text-slate-100 hover:opacity-70"
        onClick={handleOpenPopUp}
      >
        Logout
      </button>

      {isPopUpOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-200 bg-opacity-90 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-bold mb-2">Confirm Logout</h3>
            <p>Are you sure you want to Log out?</p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
                onClick={handleClosePopUp}
              >
                No
              </button>
              <button
                className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
                onClick={handleLogout}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
