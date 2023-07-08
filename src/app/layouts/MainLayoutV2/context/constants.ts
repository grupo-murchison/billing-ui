export enum ACTION_TYPES {
  MENU_OPEN,
  TOGGLE_SIDEBAR,
}

export type TAction = { type: ACTION_TYPES; id?: string | number };

export interface IStateSideBar {
  isActive: string[];
  isSidebarOpen: boolean;
}

export interface ISideBarContext extends IStateSideBar {
  dispatch: React.Dispatch<TAction>;
}

export const initialState: IStateSideBar = {
  isActive: [''], // for active default menu
  isSidebarOpen: false,
};
