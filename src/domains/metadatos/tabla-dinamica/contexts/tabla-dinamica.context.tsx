import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const TablaDinamicaContext = createContext(initialContext);

const TablaDinamicaProvider = ({ children }: TablaDinamicaProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <TablaDinamicaContext.Provider value={{ mainDataGrid }}>{children}</TablaDinamicaContext.Provider>;
};

type TablaDinamicaProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { TablaDinamicaContext, TablaDinamicaProvider };
