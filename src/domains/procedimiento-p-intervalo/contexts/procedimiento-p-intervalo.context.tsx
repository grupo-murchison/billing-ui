import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const ProcedimientoPIntervaloContext = createContext(initialContext);

const ProcedimientoPIntervaloProvider = ({ children }: ProcedimientoPIntervaloProviderProps) => {
  const mainDataGrid = useDataGrid();

  return (
    <ProcedimientoPIntervaloContext.Provider value={{ mainDataGrid }}>
      {children}
    </ProcedimientoPIntervaloContext.Provider>
  );
};

type ProcedimientoPIntervaloProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { ProcedimientoPIntervaloContext, ProcedimientoPIntervaloProvider };
