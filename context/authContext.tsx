import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

type Ctx = { user: User | null; loading: boolean; isAdmin: boolean; };
const AuthContext = createContext<Ctx>({ user: null, loading: true, isAdmin: false });
export const useAuth = () => useContext(AuthContext);

const ADMIN_EMAIL = "your-admin@email.com"; // 👈 change this

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);
      setIsAdmin(!!u && u.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
