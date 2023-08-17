import { useContext } from 'react';
import SidebarContext from './SidebarContext';

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};
