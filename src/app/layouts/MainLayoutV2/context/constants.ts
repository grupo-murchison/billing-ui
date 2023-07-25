import { IStateSidebar } from '../interfaces/sidebar.interfaces';

export enum ACTION_TYPES {
  MENU_OPEN,
  TOGGLE_SIDEBAR,
}

export const initialState: IStateSidebar = {
  isActive: [''], // for active default menu
  isSidebarOpen: false,
};

export const drawerWidthOpen = 260;
export const drawerWidthClosed = 50;
