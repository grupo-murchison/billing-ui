import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const ProcedimientoPContext = createContext(initialContext);

const ProcedimientoPProvider = ({ children }: ProcedimientoPProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <ProcedimientoPContext.Provider value={{ mainDataGrid }}>{children}</ProcedimientoPContext.Provider>;
};

type ProcedimientoPProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { ProcedimientoPContext, ProcedimientoPProvider };
