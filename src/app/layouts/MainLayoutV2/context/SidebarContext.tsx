import { createContext } from 'react';

import { initialState, ISideBarContext } from './constants';

const SideBarContext = createContext<ISideBarContext>({ ...initialState, dispatch: () => null });

export default SideBarContext;
