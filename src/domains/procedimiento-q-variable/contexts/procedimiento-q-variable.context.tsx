import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const ProcedimientoQVariableContext = createContext(initialContext);

const ProcedimientoQVariableProvider = ({ children }: ProcedimientoQVariableProviderProps) => {
  const mainDataGrid = useDataGrid();

  return (
    <ProcedimientoQVariableContext.Provider value={{ mainDataGrid }}>{children}</ProcedimientoQVariableContext.Provider>
  );
};

type ProcedimientoQVariableProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { ProcedimientoQVariableContext, ProcedimientoQVariableProvider };
