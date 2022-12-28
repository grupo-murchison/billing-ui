import { createContext, useCallback, useState } from 'react';
import type { ReactNode } from 'react';

const initialContext: InitialContext = {
  isSidebarOpen: false,
  closeSidebar: () => {
    /* */
  },
  toogleSidebar: () => {
    /* */
  },
};

const MainLayoutContext = createContext(initialContext);

const MainLayoutProvider = ({ children }: MainLayoutProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(initialContext.isSidebarOpen);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const toogleSidebar = useCallback(() => {
    setIsSidebarOpen(prevValue => !prevValue);
  }, []);

  return (
    <MainLayoutContext.Provider
      value={{
        isSidebarOpen,
        closeSidebar,
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
  closeSidebar: () => void;
  toogleSidebar: () => void;
};

export { MainLayoutContext, MainLayoutProvider };
