import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const ProcedimientoQContext = createContext(initialContext);

const ProcedimientoQProvider = ({ children }: ProcedimientoQProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <ProcedimientoQContext.Provider value={{ mainDataGrid }}>{children}</ProcedimientoQContext.Provider>;
};

type ProcedimientoQProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { ProcedimientoQContext, ProcedimientoQProvider };
