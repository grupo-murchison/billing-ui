// Su funcion es devolver un nuevo state

import { ACTION_TYPES, IStateSideBar, TAction } from './constants';

// uso inferencia de tipos con typeof
export const sideBarReducer = (state: IStateSideBar, action: TAction) => {
  switch (action.type) {
    case ACTION_TYPES.MENU_OPEN:
      return {
        ...state,
        isActive: [action.id],
      };
    case ACTION_TYPES.SET_MENU:
      return {
        ...state,
        opened: action.opened,
      };
    default:
      return state;
  }
};
