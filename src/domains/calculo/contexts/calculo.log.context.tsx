import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const FacturacionLogContext = createContext(initialContext);

const FacturacionLogProvider = ({ children }: FacturacionProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <FacturacionLogContext.Provider value={{ mainDataGrid }}>{children}</FacturacionLogContext.Provider>;
};

type FacturacionProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { FacturacionLogContext, FacturacionLogProvider };
