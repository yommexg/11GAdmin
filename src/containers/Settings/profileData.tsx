import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaPen, FaSave } from "react-icons/fa";
import { RootState, useAppDispatch } from "../../redux/store";
import { User } from "../../../types";
import { updateProfData } from "../../redux/slice/getUserSlice";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  UserInfo?: {
    _id: string;
  };
}

const ProfileData: React.FC = () => {
  const userData = useSelector(
    (state: RootState) => state.getUser.userData as User
  );

  const [isEditing, setIsEditing] = useState(false);

  const [username, setUsername] = useState(userData.username);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [houseNo, setHouseNo] = useState(userData.address?.houseNo || "");
  const [street, setStreet] = useState(userData.address?.street || "");
  const [city, setCity] = useState(userData.address?.city || "");
  const [state, setState] = useState(userData.address?.state || "");
  const [country, setCountry] = useState(userData.address?.country || "");

  const handleEditClick = () => setIsEditing(true);

  const dispatch = useAppDispatch();

  const accessToken: string | null = localStorage.getItem("accessToken");

  const decodedToken: JwtPayload | null = accessToken
    ? jwtDecode<JwtPayload>(accessToken)
    : null;

  const userId: string | undefined = decodedToken?.UserInfo?._id;

  const handleSaveClick = async () => {
    if (
      accessToken &&
      userId &&
      (username || phoneNumber || houseNo || street || city || state || country)
    ) {
      dispatch(
        updateProfData({
          accessToken,
          userId,
          phoneNumber,
          user: username,
          address: {
            houseNo,
            street,
            city,
            state,
            country,
          },
        })
      );
    }
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center m-4 p-5 border rounded-lg shadow-lg">
      <div className="w-full">
        {isEditing && (
          <div className="flex items-center gap-8">
            <FaArrowLeft
              size={22}
              className=""
              onClick={() => setIsEditing(false)}
            />

            <h2 className="text-lg text-center text-blue-600 font-semibold">
              {userData.email}
            </h2>
          </div>
        )}
        {!isEditing && (
          <h2 className="text-lg text-center text-blue-600 font-semibold">
            {userData.email}
          </h2>
        )}
        <div className="flex items-center justify-center my-8">
          <div>
            {isEditing ? (
              <div
                className="flex items-center cursor-pointer gap-3 bg-[#45c245bb] px-5 py-3"
                onClick={handleSaveClick}
              >
                <FaSave size={20} className="text-blue-500 cursor-pointer" />
                <p>Save Changes</p>
              </div>
            ) : (
              <div
                className="flex items-center cursor-pointer gap-3 bg-[#1B1B1B] px-5 py-3"
                onClick={handleEditClick}
              >
                <FaPen size={18} className="text-blue-500 cursor-pointer" />
                <p className="text-white">Edit Profile</p>
              </div>
            )}
          </div>
        </div>
        <div className="mb-4">
          {isEditing ? (
            <>
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
            </>
          ) : (
            <p className="mt-1">
              Username: <span className="ml-2 font-bold">{username}</span>
            </p>
          )}
        </div>

        <div className="mb-4">
          {isEditing ? (
            <>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
            </>
          ) : (
            <p className="mt-1">
              Phone Number:{" "}
              <span className="ml-2 font-bold">{phoneNumber}</span>
            </p>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-center mb-3">Address</h2>
          <div className="mb-4">
            {isEditing ? (
              <>
                <label className="block text-gray-700">House No</label>
                <input
                  type="text"
                  name="houseNo"
                  value={houseNo}
                  onChange={(e) => setHouseNo(e.target.value)}
                  className="mt-1 p-2 border rounded w-full"
                />
              </>
            ) : (
              <p className="mt-1">
                House No: <span className="ml-2 font-bold">{houseNo}</span>
              </p>
            )}
          </div>
          <div className="mb-4">
            {isEditing ? (
              <>
                <label className="block text-gray-700">Street</label>
                <input
                  type="text"
                  name="street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="mt-1 p-2 border rounded w-full"
                />
              </>
            ) : (
              <p className="mt-1">
                Street: <span className="ml-2 font-bold">{street}</span>
              </p>
            )}
          </div>
          <div className="mb-4">
            {isEditing ? (
              <>
                <label className="block text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1 p-2 border rounded w-full"
                />
              </>
            ) : (
              <p className="mt-1">
                City: <span className="ml-2 font-bold">{city}</span>
              </p>
            )}
          </div>
          <div className="mb-4">
            {isEditing ? (
              <>
                <label className="block text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="mt-1 p-2 border rounded w-full"
                />
              </>
            ) : (
              <p className="mt-1">
                State: <span className="ml-2 font-bold">{state}</span>
              </p>
            )}
          </div>
          <div className="mb-4">
            {isEditing ? (
              <>
                <label className="block text-gray-700">Country</label>
                <input
                  type="text"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-1 p-2 border rounded w-full"
                />
              </>
            ) : (
              <p className="mt-1">
                Country: <span className="ml-2 font-bold">{country}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
