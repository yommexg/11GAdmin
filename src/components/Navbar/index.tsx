import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { User } from "../../../types";

import MobileSidebar from "./mobileSidebar";

import Logo from "../../utils/logo";
import { scrollToTop } from "../../utils/scrollToTop";

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
    <div className="md:ml-[250px] py-5 md:px-4 bg-white shadow-lg">
      <div className="flex items-center justify-between md:hidden ">
        <div className="mx-2 flex gap-2 items-center">
          <MobileSidebar
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            scrollToTop={mobileScrollToTop}
          />
          {!isMenuOpen && <Logo />}
          {userData.status}
        </div>
        {/* <div>profile, not, theme</div> */}
      </div>
    </div>
  );
};

export default Navbar;
