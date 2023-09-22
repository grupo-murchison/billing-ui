import { createContext } from 'react';

import { initialState } from './constants';
import { ISidebarContext } from '../interfaces/sidebar.interfaces';

const LayoutContext = createContext<ISidebarContext>({
  ...initialState,
  dispatch: () => null,
  toogleSidebar: () => null,
  toogleOpenMenu: () => null,
  toogleActiveMenu: () => null,
});

export default LayoutContext;
