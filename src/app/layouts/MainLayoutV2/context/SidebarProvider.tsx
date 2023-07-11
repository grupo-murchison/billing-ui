import { useReducer, ReactNode } from 'react';
import { initialState } from './constants';
import SideBarContext from './SidebarContext';
import { sideBarReducer } from './sidebarReducer';

const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(sideBarReducer, initialState);

  return <SideBarContext.Provider value={{ isActive: state.isActive, isSidebarOpen: state.isSidebarOpen, dispatch }}>{children}</SideBarContext.Provider>;
};

export default SidebarProvider;
