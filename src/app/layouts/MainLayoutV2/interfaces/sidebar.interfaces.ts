import { ACTION_TYPES } from '../context/constants';

export interface IStateSidebar {
  isActive: string[];
  isSidebarOpen: boolean;
}

export interface ISidebarContext extends IStateSidebar {
  dispatch: React.Dispatch<TSidebarAction>;
  toogleSidebar: () => void;
  toogleOpenMenu?: (id: string) => void;
}

export type TSidebarAction = { type: ACTION_TYPES.TOGGLE_SIDEBAR } | { type: ACTION_TYPES.MENU_OPEN; id: string };
