import React, { createContext, useContext, useState } from "react";

export type UserType = "cliente" | "especialista" | null;

export interface UserProfile {
  id: string;
  userType: UserType;
  fullName?: string;
  email?: string;
  // Agrega aquí otros campos que quieras guardar del perfil
}

interface UserContextProps {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const handleSetUser = (userProfile: UserProfile) => {
    setUser(userProfile);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext); 