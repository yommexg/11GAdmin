import { Link } from "react-router-dom";
import Logo from "../../utils/logo";
import { sidebarData } from "./data";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { User } from "../../../types";

const noAvatar = new URL("../../assets/noAvatar.png", import.meta.url).href;

const Sidebar: React.FC = () => {
  const userData = useSelector(
    (state: RootState) => state.getUser.userData as User
  );
  return (
    <div className="hidden md:block top-0 bottom-0 fixed bg-white shadow-xl w-[350px] py-8 px-5">
      <div className="flex justify-between">
        <Logo />
        <div className="flex items-center gap-8">
          <img
            src={userData.avatar ? userData.avatar : noAvatar}
            alt={userData.username}
            className="h-10 w-10 rounded-full"
          />
          {/* <div className="relative cursor-pointer" onClick={handleNotification}>
            <FaBell size={25} />
            {showNotificationNumber && (
              <p className="absolute -top-4 right-0 text-red-500 font-semibold">
                0
              </p>
            )}
          </div> */}
        </div>
      </div>

      <p className="mt-8 text-sm text-gray-400">Menu</p>
      <div className="mt-5">
        {sidebarData.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            className={`flex items-center px-4 py-3 gap-5 mb-4 hover:opacity-60 ${
              location.pathname === item.link ? "bg-gray-500" : ""
            }`}
          >
            <img src={item?.imgSrc} alt="" className="h-7 w-7" />
            <p
              className={`${
                location.pathname === item.link ? "text-white" : "text-black"
              } font-semibold`}
            >
              {item?.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
