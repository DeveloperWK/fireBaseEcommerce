import { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../Hooks/useAuth";

const ProtectedAdminRoute = ({ children }: PropsWithChildren) => {
  const { role, isLoggedIn } = useAuth();

  return (
    <>{isLoggedIn && role === "admin" ? children : <Navigate to={"/"} />}</>
  );
};

export default ProtectedAdminRoute;
