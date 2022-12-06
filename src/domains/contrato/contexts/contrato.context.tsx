import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const ContratoContext = createContext(initialContext);

const ContratoProvider = ({ children }: ContratoProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <ContratoContext.Provider value={{ mainDataGrid }}>{children}</ContratoContext.Provider>;
};

type ContratoProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { ContratoContext, ContratoProvider };
