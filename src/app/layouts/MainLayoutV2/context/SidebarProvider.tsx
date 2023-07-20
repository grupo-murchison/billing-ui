import { useReducer, ReactNode } from 'react';
import { ACTION_TYPES, initialState } from './constants';
import SidebarContext from './SidebarContext';
import { sideBarReducer } from './sidebarReducer';

const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(sideBarReducer, initialState);

  const toogleSidebar = () => {
    dispatch({ type: ACTION_TYPES.TOGGLE_SIDEBAR });
  };

  const toogleOpenMenu = (id: string) => {
    dispatch({ type: ACTION_TYPES.MENU_OPEN, id });
  };

  return (
    <SidebarContext.Provider value={{ ...state, dispatch, toogleSidebar, toogleOpenMenu }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
