import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const ProcedimientoPSIntervaloContext = createContext(initialContext);

const ProcedimientoPSIntervaloProvider = ({ children }: ProcedimientoPSIntervaloProviderProps) => {
  const mainDataGrid = useDataGrid();

  return (
    <ProcedimientoPSIntervaloContext.Provider value={{ mainDataGrid }}>
      {children}
    </ProcedimientoPSIntervaloContext.Provider>
  );
};

type ProcedimientoPSIntervaloProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { ProcedimientoPSIntervaloContext, ProcedimientoPSIntervaloProvider };
