import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserRole } from "../../../types";

interface RequireAuthProps {
  allowedRoles: UserRole[];
}

interface JwtPayload {
  UserInfo?: {
    _id: string;
    roles?: UserRole[];
  };
}

const RequireAuth: FC<RequireAuthProps> = ({ allowedRoles }) => {
  const accessToken: string | null = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  const decodedToken = jwtDecode<JwtPayload>(accessToken);

  const roles = decodedToken?.UserInfo?.roles || [];

  if (roles.some((role) => allowedRoles.includes(role))) {
    return <Outlet />;
  }

  return <Navigate to="/unauthorized" replace />;
};

export default RequireAuth;
