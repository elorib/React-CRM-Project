import React, { useEffect, useState } from "react";
import usersService from "../services/users-service";

export const authContext = React.createContext(usersService.getUser());
authContext.displayName = "Auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(usersService.getUser());

  const refreshUser = () => {
    setUser(usersService.getUser());
  };

  const createUser = (user) => {
    return usersService.createUser(user);
  };

  const loginUser = async (user) => {
    const response = await usersService.logUser(user);
    refreshUser();
    return response;
  };

  const logout = () => {
    usersService.logout();
    refreshUser();
  };

  return (
    <authContext.Provider value={{ user, loginUser, logout, createUser }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(authContext);
};
