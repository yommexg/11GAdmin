import { Routes, Route } from "react-router-dom";

import Home from "./containers/Home";
import Login from "./containers/Login";
import RequireAuth from "./components/RequireAuth";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getUser } from "./redux/slice/getUserSlice";
import { RootState, useAppDispatch } from "./redux/store";
import NewCar from "./containers/NewCar";
import SellCarRequest from "./containers/SellCar";
import UsedCar from "./containers/UsedCar";
import CarAss from "./containers/CarAss";
import Order from "./containers/Order";
import Settings from "./containers/Settings";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import Users from "./containers/Users";

interface JwtPayload {
  UserInfo?: {
    _id: string;
  };
}

function App() {
  const dispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.getUser.loading);

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
    }
  }, [dispatch]);

  return (
    <>
      {loading && <Spinner />}
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth allowedRoles={[5150]} />}>
          <Route path="/" element={<Home />} />
          <Route path="/sell-car" element={<SellCarRequest />} />
          <Route path="/new-cars" element={<NewCar />} />
          <Route path="/used-cars" element={<UsedCar />} />
          <Route path="/car-ass" element={<CarAss />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
