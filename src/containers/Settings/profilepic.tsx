import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FaPen } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

import { User } from "../../../types";
import { RootState, useAppDispatch } from "../../redux/store";
import { updateProfPic } from "../../redux/slice/getUserSlice";

interface JwtPayload {
  UserInfo?: {
    _id: string;
  };
}

const noAvatar = new URL("../../assets/noAvatar.png", import.meta.url).href;

const ProfilePic: React.FC = () => {
  const userData = useSelector(
    (state: RootState) => state.getUser.userData as User
  );

  const accessToken: string | null = localStorage.getItem("accessToken");

  const decodedToken: JwtPayload | null = accessToken
    ? jwtDecode<JwtPayload>(accessToken)
    : null;

  const userId: string | undefined = decodedToken?.UserInfo?._id;

  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>();

  const dispatch = useAppDispatch();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && userId && accessToken) {
      dispatch(
        updateProfPic({
          userId,
          accessToken,
          selectedFile: file,
        })
      );
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center my-5">
      <div className="flex items-end">
        <img
          src={uploadedAvatar || userData.avatar || noAvatar}
          alt={userData.username}
          className="h-44 w-44 rounded-full bg-gray-300 p-1 "
        />
        <FaPen
          size={22}
          color="blue"
          className="-ml-4"
          onClick={handleButtonClick}
        />
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/jpeg, image/jpg, image/png"
      />
    </div>
  );
};

export default ProfilePic;
