import { useLocalStorage } from '@app/hooks';
import { isTokenExpired } from '@app/utils/jwt.util';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type LoginFunction = (token: string) => void;
type LogoutFunction = () => void;

interface InitialState {
  isAuthenticated: boolean;
  token: string,
  allowAccess: LoginFunction;
  logout: LogoutFunction;
}

// Estado inicial
const initialState: InitialState = {
  isAuthenticated: false,
  token: '',
  allowAccess: (token: string) => {
    /**/
  },
  logout: () => {
    /**/
  },
};

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useLocalStorage('token', undefined)
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const logout = () => {
    setToken(undefined);
    setIsAuthenticated(false);
  };

  const allowAccess = useCallback((newToken: string) => {
    setToken(newToken);
    setIsAuthenticated(true);
  }, []);

  const value = useMemo(() => ({
    isAuthenticated,
    token,
    allowAccess,
    logout,
  }), [isAuthenticated, token, allowAccess, logout]);


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

type AuthProviderProps = {
  children: ReactNode;
};



export { AuthProvider, AuthContext };
