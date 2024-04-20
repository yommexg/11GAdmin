import { Link } from "react-router-dom";
import Logo from "../../utils/logo";
import { sidebarData } from "./data";

const Sidebar: React.FC = () => {
  return (
    <div className="hidden md:block top-0 bottom-0 fixed bg-white shadow-xl w-[250px] py-8 px-5">
      <div>
        <Logo />
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
