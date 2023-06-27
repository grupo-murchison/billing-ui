import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const FacturasContext = createContext(initialContext);

const FacturasProvider = ({ children }: FacturasProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <FacturasContext.Provider value={{ mainDataGrid }}>{children}</FacturasContext.Provider>;
};

type FacturasProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { FacturasContext, FacturasProvider };
