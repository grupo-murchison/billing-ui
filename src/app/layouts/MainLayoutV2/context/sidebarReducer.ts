import { IStateSidebar, TSidebarAction } from '../interfaces/sidebar.interfaces';
import { ACTION_TYPES } from './constants';

export const sideBarReducer = (state: IStateSidebar, action: TSidebarAction) => {
  switch (action.type) {
    case ACTION_TYPES.MENU_OPEN:
      if (action.id === state.isMenuActive) {
        action.id = '';
      }
      return {
        ...state,
        isMenuActive: action.id,
      };
    case ACTION_TYPES.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: action.openSidebar,
      };
    default:
      return state;
  }
};
