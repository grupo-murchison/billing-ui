export enum ACTION_TYPES {
  MENU_OPEN,
  SET_MENU,
}

export type TAction = { type: ACTION_TYPES; id: string; opened: boolean };

export interface IStateSideBar {
  isActive: string[];
  opened: boolean;
}

export interface ISideBarContext extends IStateSideBar {
  dispatch: React.Dispatch<any>;
}

export const initialState: IStateSideBar = {
  isActive: [''], // for active default menu
  opened: true,
};
