import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { checkAuth } from "./auth";

interface AuthContextType {
  user: any;
  authLoading: boolean;
}
interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

type User = null | {
  isAuthenticated: boolean;
  sid: string;
  userID: string;
  fName: string;
  lName: string;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    try {
      checkAuth().then((data) => {
        if (data.user.isAuthenticated) setUser(data.user);
      });
    } catch (error) {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
