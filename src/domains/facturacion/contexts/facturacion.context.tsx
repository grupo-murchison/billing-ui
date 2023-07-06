import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const FacturacionContext = createContext(initialContext);

const FacturacionProvider = ({ children }: FacturacionProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <FacturacionContext.Provider value={{ mainDataGrid }}>{children}</FacturacionContext.Provider>;
};

type FacturacionProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { FacturacionContext, FacturacionProvider };
