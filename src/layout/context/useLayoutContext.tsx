import { useContext } from 'react';
import LayoutContext from './LayoutContext';

export const useLayoutContext = () => {
  return useContext(LayoutContext);
};
