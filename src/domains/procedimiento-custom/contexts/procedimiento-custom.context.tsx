import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const ProcedimientoCustomContext = createContext(initialContext);

type ProcedimientoCustomProviderProps = {
  children?: ReactNode;
};

const ProcedimientoCustomProvider = ({ children }: ProcedimientoCustomProviderProps) => {
  const mainDataGrid = useDataGrid();

  return (
    <ProcedimientoCustomContext.Provider value={{ mainDataGrid }}>{children}</ProcedimientoCustomContext.Provider>
  );
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { ProcedimientoCustomContext, ProcedimientoCustomProvider };
