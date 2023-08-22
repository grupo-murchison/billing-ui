import { IStateSidebar, TSidebarAction } from '../interfaces/sidebar.interfaces';
import { ACTION_TYPES } from './constants';

export const sideBarReducer = (state: IStateSidebar, action: TSidebarAction) => {
  switch (action.type) {
    case ACTION_TYPES.MENU_OPEN:
      return {
        ...state,
        isMenuExpanded: [action.id],
      };
    case ACTION_TYPES.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: action.openSidebar,
      };
    case ACTION_TYPES.MENU_ACTIVE:
      return {
        ...state,
        isActive: [action.id],
      };
    default:
      return state;
  }
};
