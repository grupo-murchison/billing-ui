import { useLocalStorage } from '@app/hooks';
import { createContext, useCallback, useState } from 'react';
import type { ReactNode } from 'react';

interface InitialState {
  isAuthenticated: boolean;
  token: string;
  allowAccess: (token: string) => void;
  logout: () => void;
}

// Estado inicial
const initialState: InitialState = {
  isAuthenticated: false,
  token: '',
  allowAccess: () => {
    //** */
  },
  logout: () => {
    //** */
  },
};

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useLocalStorage('token', undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const logout = () => {
    setToken(undefined);
    setIsAuthenticated(false);
  };

  const allowAccess = useCallback((newToken: string) => {
    setToken(newToken);
    setIsAuthenticated(true);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, allowAccess, logout }}>{children}</AuthContext.Provider>
  );
};

type AuthProviderProps = {
  children: ReactNode;
};

export { AuthProvider, AuthContext };
