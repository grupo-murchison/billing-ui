import { createContext, useCallback, useState } from 'react';
import type { ReactNode } from 'react';

const initialContext: InitialContext = {
  idSidebarItemOpen: '',
  isSidebarOpen: false,
  closeSidebar: () => {
    /* */
  },
  toogleSidebar: () => {
    /* */
  },
  toogleSidebarItemContent: () => {
    /* */
  },
  closeSidebarItemContent: () => {
    /* */
  },
};

const MainLayoutContext = createContext(initialContext);

const MainLayoutProvider = ({ children }: MainLayoutProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(initialContext.isSidebarOpen);

  const [idSidebarItemOpen, setIdSidebarItemOpen] = useState<string>('');

  const toogleSidebarItemContent = useCallback((id: string) => {
    setIdSidebarItemOpen(prevId => {
      if (prevId === id) return 'none';

      return id;
    });
  }, []);

  const closeSidebarItemContent = useCallback(() => {
    setIdSidebarItemOpen('none');
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const toogleSidebar = useCallback(() => {
    setIsSidebarOpen(prevValue => !prevValue);
    setIdSidebarItemOpen('none');
  }, []);

  return (
    <MainLayoutContext.Provider
      value={{
        idSidebarItemOpen,
        isSidebarOpen,
        closeSidebar,
        toogleSidebar,
        toogleSidebarItemContent,
        closeSidebarItemContent,
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
  idSidebarItemOpen: string;
  isSidebarOpen: boolean;
  closeSidebar: () => void;
  toogleSidebar: () => void;
  toogleSidebarItemContent: (id: string) => void;
  closeSidebarItemContent: () => void;
};

export { MainLayoutContext, MainLayoutProvider };
