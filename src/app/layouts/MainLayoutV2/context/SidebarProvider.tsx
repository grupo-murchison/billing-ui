import { useReducer, ReactNode, useCallback } from 'react';
import { ACTION_TYPES, initialState } from './constants';
import SidebarContext from './SidebarContext';
import { sideBarReducer } from './sidebarReducer';

const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(sideBarReducer, initialState);

  // const toogleSidebar = (openSidebar: boolean) => {
  //   dispatch({ type: ACTION_TYPES.TOGGLE_SIDEBAR, openSidebar });
  // };

  const toogleSidebar = useCallback((openSidebar: boolean) => {
    dispatch({ type: ACTION_TYPES.TOGGLE_SIDEBAR, openSidebar });
  }, []);

  // const toogleOpenMenu = (id: string) => {
  //   dispatch({ type: ACTION_TYPES.MENU_OPEN, id });
  // };

  const toogleOpenMenu = useCallback((id: string) => {
    dispatch({ type: ACTION_TYPES.MENU_OPEN, id });
  }, []);

  // const toogleActiveMenu = (id: string) => {
  //   dispatch({ type: ACTION_TYPES.MENU_ACTIVE, id });
  // };

  const toogleActiveMenu = useCallback((id: string) => {
    dispatch({ type: ACTION_TYPES.MENU_ACTIVE, id });
  }, []);

  return (
    <SidebarContext.Provider value={{ ...state, dispatch, toogleSidebar, toogleOpenMenu, toogleActiveMenu }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
