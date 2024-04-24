import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import { sidebarData } from "./data";
import Logo from "../../utils/logo";

interface MobileSidebarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  scrollToTop: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isMenuOpen,
  toggleMenu,
  //   scrollToTop,
}) => {
  const openMenu = () => {
    toggleMenu();
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    toggleMenu();
    document.body.style.overflow = "";
  };

  return (
    <div>
      <div className="cursor-pointer">
        {!isMenuOpen && <FaBars size={25} onClick={openMenu} />}
      </div>
      {isMenuOpen && (
        <div className="z-50 fixed inset-0  bg-white opacity-95">
          <div className="block md:hidden top-0 bottom-0 left-0 fixed bg-gray-400 shadow-xl w-[250px] py-8 px-5">
            <p
              className="absolute top-1 px-3 pb-1 right-1 text-2xl bg-white rounded-full cursor-pointer"
              onClick={closeMenu}
            >
              x
            </p>
            <div>
              <Logo />
            </div>
            <p className="mt-8 text-sm text-gray-900">Menu</p>
            <div className="mt-5">
              {sidebarData.map((item, index) => (
                <Link
                  to={item.link}
                  key={index}
                  className={`flex items-center px-4 py-3 gap-5 mb-4 hover:opacity-60 ${
                    (location.pathname === item.link ||
                      (item.link2 &&
                        location.pathname.startsWith(
                          item.link2.slice(0, -2)
                        ))) &&
                    "bg-gray-500"
                  }`}
                >
                  <img src={item.imgSrc} alt="" className="h-7 w-7" />
                  <p
                    className={`${
                      (location.pathname === item.link ||
                        (item.link2 &&
                          location.pathname.startsWith(
                            item.link2.slice(0, -2)
                          ))) &&
                      "text-white"
                    } font-semibold`}
                  >
                    {item.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSidebar;
