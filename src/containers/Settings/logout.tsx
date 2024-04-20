import { useNavigate } from "react-router-dom";

import { logoutAsync } from "../../redux/slice/logoutSlice";
import { useAppDispatch } from "../../redux/store";

const Logout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      dispatch(
        logoutAsync({
          extra: {
            navigate,
          },
        })
      );
    }
  };

  return (
    <button
      className="bg-black m-5 px-5 py-2 text-slate-100 hover:opacity-70"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
