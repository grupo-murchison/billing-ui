import { createContext } from 'react';

import { initialState, ISidebarContext } from './constants';

const SidebarContext = createContext<ISidebarContext>({ ...initialState, dispatch: () => null });

export default SidebarContext;
