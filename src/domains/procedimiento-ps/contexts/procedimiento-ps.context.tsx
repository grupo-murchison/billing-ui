import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const ProcedimientoPSContext = createContext(initialContext);

const ProcedimientoPSProvider = ({ children }: ProcedimientoPSProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <ProcedimientoPSContext.Provider value={{ mainDataGrid }}>{children}</ProcedimientoPSContext.Provider>;
};

type ProcedimientoPSProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { ProcedimientoPSContext, ProcedimientoPSProvider };
