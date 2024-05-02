import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { getUser } from "./redux/slice/getUserSlice";
import { RootState, useAppDispatch } from "./redux/store";
import { getNewCars } from "./redux/slice/newCarSlice";

import Home from "./containers/Home";
import Login from "./containers/Login";
import SellCarRequest from "./containers/SellCar";
import UsedCar from "./containers/UsedCar";
import CarAss from "./containers/CarAss";
import Order from "./containers/Order";
import Settings from "./containers/Settings";
import Users from "./containers/Users";
import Notification from "./containers/Notifications";
import NewCars from "./containers/NewCar";

import RequireAuth from "./components/RequireAuth";
import Spinner from "./components/Spinner";
import NewCarDetails from "./containers/NewCar/newCarDetails";
import { getUsedCars } from "./redux/slice/usedCarSlice";
import UsedCarDetails from "./containers/UsedCar/usedCarDetails";

interface JwtPayload {
  UserInfo?: {
    _id: string;
  };
}

function App() {
  const dispatch = useAppDispatch();
  const loadingUser = useSelector((state: RootState) => state.getUser.loading);
  const loadingNewCars = useSelector(
    (state: RootState) => state.newCar.loading
  );
  const loadingUsedCars = useSelector(
    (state: RootState) => state.usedCar.loading
  );
  const loadingLogin = useSelector((state: RootState) => state.login.loading);
  const loadingLogout = useSelector((state: RootState) => state.login.loading);

  useEffect(() => {
    const accessToken: string | null = localStorage.getItem("accessToken");
    const decodedToken: JwtPayload | null = accessToken
      ? jwtDecode<JwtPayload>(accessToken)
      : null;
    const userId: string | undefined = decodedToken?.UserInfo?._id;

    if (accessToken && userId) {
      dispatch(
        getUser({
          accessToken,
          userId,
        })
      );
      dispatch(getNewCars({ userId }));
      dispatch(getUsedCars({ userId }));
    }
  }, [dispatch]);

  return (
    <div className="mt-[84px] md:mt-0">
      {(loadingUser ||
        loadingNewCars ||
        loadingUsedCars ||
        loadingLogout ||
        loadingLogin) && <Spinner />}
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth allowedRoles={[5150]} />}>
          <Route path="/" element={<Home />} />
          <Route path="/sell-car" element={<SellCarRequest />} />
          <Route path="/new-cars" element={<NewCars />} />
          <Route path="/used-cars" element={<UsedCar />} />
          <Route path="/car-ass" element={<CarAss />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/new-cars/:newCarId" element={<NewCarDetails />} />
          <Route path="/used-cars/:usedCarId" element={<UsedCarDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
