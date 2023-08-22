import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const ClienteEventosContext = createContext(initialContext);

const ClienteEventosProvider = ({ children }: ClienteEventosProps) => {
  const mainDataGrid = useDataGrid();

  return <ClienteEventosContext.Provider value={{ mainDataGrid }}>{children}</ClienteEventosContext.Provider>;
};

type ClienteEventosProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { ClienteEventosContext , ClienteEventosProvider };
