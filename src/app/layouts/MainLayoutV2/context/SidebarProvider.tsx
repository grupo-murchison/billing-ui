import { useReducer, ReactNode } from 'react';
import { initialState } from './constants';
import SidebarContext from './SidebarContext';
import { sideBarReducer } from './sidebarReducer';

const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(sideBarReducer, initialState);

  return <SidebarContext.Provider value={{ ...state, dispatch }}>{children}</SidebarContext.Provider>;
};

export default SidebarProvider;
