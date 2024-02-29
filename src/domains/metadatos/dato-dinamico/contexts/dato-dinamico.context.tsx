import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const DatoDinamicoContext = createContext(initialContext);

const DatoDinamicoProvider = ({ children }: DatoDinamicoProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <DatoDinamicoContext.Provider value={{ mainDataGrid }}>{children}</DatoDinamicoContext.Provider>;
};

type DatoDinamicoProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { DatoDinamicoContext, DatoDinamicoProvider };
