import React from "react";
import firebase, { User } from "firebase/app";

interface IUser {
  user: firebase.User;
  setUser: (user: any) => void;
}

const defaultValue: IUser = {
  user: null,
  setUser: (user: firebase.User) => {},
};

export const UserContext = React.createContext<IUser>(defaultValue);
