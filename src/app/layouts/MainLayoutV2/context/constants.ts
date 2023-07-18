export enum ACTION_TYPES {
  MENU_OPEN,
  TOGGLE_SIDEBAR,
}

export type TSidebarAction = { type: ACTION_TYPES.TOGGLE_SIDEBAR } | { type: ACTION_TYPES.MENU_OPEN; id: string };

export interface IStateSidebar {
  isActive: string[];
  isSidebarOpen: boolean;
}

export interface ISidebarContext extends IStateSidebar {
  dispatch: React.Dispatch<TSidebarAction>;
}

export const initialState: IStateSidebar = {
  isActive: [''], // for active default menu
  isSidebarOpen: false,
};
