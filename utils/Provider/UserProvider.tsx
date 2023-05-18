import React, { Dispatch, SetStateAction, createContext, useState } from "react";
interface IUserProps {
  userID: string,
  userName: string,
  phoneNumber: string,
  password: string,
  rewardPoints: string,
  numberOfBike: string,
  image: string,
  roles: string
}

interface IUser {
  user: IUserProps;
  setUser: Dispatch<SetStateAction<IUserProps>>;
}

export const UserContext = createContext<IUser>({} as IUser);

export const UserContextProvider = (props: any) => {
  const [user, setUser] = useState<IUserProps>({} as IUserProps);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};