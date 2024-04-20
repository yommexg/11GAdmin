import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { User } from "../../../types";

import MobileSidebar from "./mobileSidebar";

import Logo from "../../utils/logo";
import { scrollToTop } from "../../utils/scrollToTop";
import { FaBell } from "react-icons/fa";

const noAvatar = new URL("../../assets/noAvatar.png", import.meta.url).href;

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const userData = useSelector(
    (state: RootState) => state.getUser.userData as User
  );

  const mobileScrollToTop = () => {
    scrollToTop();
    toggleMenu();
    document.body.style.overflow = "";
  };

  return (
    <div className="md:ml-[250px] py-5 md:py-8 px-4 bg-white shadow-lg">
      <div className="flex items-center justify-between md:hidden ">
        <MobileSidebar
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          scrollToTop={mobileScrollToTop}
        />
        {!isMenuOpen && <Logo />}
        <div className="cursor-pointer flex items-center gap-8">
          <img
            src={userData.avatar ? userData.avatar : noAvatar}
            alt={userData.username}
            className="h-10 w-10 rounded-full"
          />
          <div className="relative">
            <FaBell size={25} />
            <p className="absolute -top-4 right-0 text-red-500 font-semibold">
              0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
