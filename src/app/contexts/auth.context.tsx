import { createContext, useCallback, useState } from 'react';
import type { ReactNode } from 'react';

const initialState: InitialState = {
  isAuthenticated: false,
  allowAccess: () => {
    /**/
  },
};

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const allowAccess = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  return <AuthContext.Provider value={{ allowAccess, isAuthenticated }}>{children}</AuthContext.Provider>;
};

type AuthProviderProps = {
  children: ReactNode;
};

type InitialState = {
  isAuthenticated: boolean;
  allowAccess: () => void;
};

export { AuthProvider, AuthContext };
