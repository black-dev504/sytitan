import { set } from 'mongoose';
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dog, setDog] = useState(null);

  const login = (userData) => setUser(userData);
  const setDogData = (dogData) => setDog(dogData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout,setDogData, dog }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

