import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const ClienteContext = createContext(initialContext);

const ClienteProvider = ({ children }: ClienteProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <ClienteContext.Provider value={{ mainDataGrid }}>{children}</ClienteContext.Provider>;
};

type ClienteProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { ClienteContext, ClienteProvider };
