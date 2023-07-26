import { IStateSidebar } from '../interfaces/sidebar.interfaces';

export enum ACTION_TYPES {
  MENU_OPEN,
  TOGGLE_SIDEBAR,
  MENU_ACTIVE = 2,
}

export const initialState: IStateSidebar = {
  isActive: [''],
  isSidebarOpen: false,
  isMenuExpanded: [''],
};

export const drawerWidthOpen = 260;
export const drawerWidthClosed = 50;
