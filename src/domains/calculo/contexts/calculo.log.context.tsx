import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const CalculoLogContext = createContext(initialContext);

const CalculoLogProvider = ({ children }: CalculoProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <CalculoLogContext.Provider value={{ mainDataGrid }}>{children}</CalculoLogContext.Provider>;
};

type CalculoProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { CalculoLogContext, CalculoLogProvider };
