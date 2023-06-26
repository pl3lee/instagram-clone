"use client";
import { createContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext<{ user: any; setUser: any } | null>(
  null
);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  const refetchUser = () => {
    axios
      .get(`http://localhost:3001/users/${user.uid}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        axios
          .get(`http://localhost:3001/users/fb/${currentUser.uid}`)
          .then((response) => {
            console.log("AuthContext changed", response.data);
            setUser(response.data);
          })
          .catch((err) => console.log(err));
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
