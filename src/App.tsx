import { Routes, Route } from "react-router-dom";

import Home from "./containers/Home";
import Login from "./containers/Login";
import RequireAuth from "./components/RequireAuth";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getUser } from "./redux/slice/getUserSlice";
import { useAppDispatch } from "./redux/store";

interface JwtPayload {
  UserInfo?: {
    _id: string;
  };
}

function App() {
  const dispatch = useAppDispatch();

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
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<RequireAuth allowedRoles={[5150]} />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
