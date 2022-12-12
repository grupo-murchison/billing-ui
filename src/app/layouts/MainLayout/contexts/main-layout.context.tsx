import { createContext, useCallback, useState } from 'react';
import type { ReactNode } from 'react';

const initialContext: InitialContext = {
  isSidebarOpen: false,
  toogleSidebar: () => {
    /* */
  },
};

const MainLayoutContext = createContext(initialContext);

const MainLayoutProvider = ({ children }: MainLayoutProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(initialContext.isSidebarOpen);

  const toogleSidebar = useCallback(() => {
    setIsSidebarOpen(prevValue => !prevValue);
  }, []);

  return (
    <MainLayoutContext.Provider
      value={{
        isSidebarOpen,
        toogleSidebar,
      }}
    >
      {children}
    </MainLayoutContext.Provider>
  );
};

type MainLayoutProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  isSidebarOpen: boolean;
  toogleSidebar: () => void;
};

export { MainLayoutContext, MainLayoutProvider };
