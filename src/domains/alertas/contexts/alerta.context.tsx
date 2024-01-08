import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const AlertaContext = createContext(initialContext);

const AlertaProvider = ({ children }: AlertaProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <AlertaContext.Provider value={{ mainDataGrid }}>{children}</AlertaContext.Provider>;
};

type AlertaProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { AlertaContext, AlertaProvider };
