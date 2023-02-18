import React, { useState, createContext } from "react";

export const UserContext = createContext({} as any);

export const UserContextProvider = (props: any) => {
  const [user, setUser] = useState("guest");

  return (
    <UserContext.Provider value={[ user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};