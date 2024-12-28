import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { PropsWithChildren, useEffect, useState } from "react";
import { auth, db } from "../Firebase/firebase.config";
import { AuthContext } from "./createContexts";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  const initializeUser = async (user: User | null) => {
    if (user) {
      setCurrentUser({ ...user });
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const role = docSnap.data()?.role;

      setRole(role);
      setIsLoggedIn(true);
    } else {
      setCurrentUser({});
      setIsLoggedIn(false);
      setRole("");
    }
    setIsLoading(false);
  };
  // type AuthContextType = {
  //   currentUser: User | null;
  //   isLoggedIn: boolean;
  //   isLoading: boolean;
  //   role: string;
  // };
  const value = {
    currentUser,
    isLoggedIn,
    isLoading,
    role,
  };
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
