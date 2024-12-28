import { useContext } from "react";
import { AuthContext } from "../Contexts/createContexts";

export const useAuth = () => {
  return useContext(AuthContext);
};
