import React, { useContext } from "react";
import { UserContext } from "../context/User.context";
import { UserContextType } from "../types/useContext.type";

const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  return context;
};

export default useUserContext;
