import { useReducer, ReactNode, useCallback } from 'react';
import { ACTION_TYPES, initialState } from './constants';
import LayoutContext from './LayoutContext';
import { layoutReducer } from './layoutReducer';

const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(layoutReducer, initialState);

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
    <LayoutContext.Provider value={{ ...state, dispatch, toogleSidebar, toogleOpenMenu, toogleActiveMenu }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
