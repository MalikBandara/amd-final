import { auth } from "@/firebase";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

type Ctx = { 
  user: User | null; 
  loading: boolean; 
  isAdmin: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<Ctx>({
  user: null,
  loading: true,
  isAdmin: false,
  logout: async () => {}, // default no-op
});

export const useAuth = () => useContext(AuthContext);

const ADMIN_EMAIL = "mmalith520@gmail.com"; // 👈 change this

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

  // 🔹 logout function
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
