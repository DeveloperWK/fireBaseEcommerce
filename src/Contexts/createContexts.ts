import { createContext } from "react";

// Define the User type
// type User = {
//   id: string;

//   email: string;
// };

// Create a context with an empty object as the default value

export const AuthContext = createContext({
  currentUser: {  },
  isLoggedIn: false,
  isLoading: true,
  role: "",
});
