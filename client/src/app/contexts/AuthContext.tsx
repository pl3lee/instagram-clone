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

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        axios
          .get(`http://localhost:3001/users/fb`, {
            params: { firebaseId: currentUser.uid },
          })
          .then((response) => console.log(response.data))
          .catch((err) => console.log(err));
        console.log(currentUser.uid);
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
