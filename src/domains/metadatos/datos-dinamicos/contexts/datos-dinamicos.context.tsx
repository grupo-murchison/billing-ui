import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const DatosDinamicosContext = createContext(initialContext);

const DatosDinamicosProvider = ({ children }: DatosDinamicosProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <DatosDinamicosContext.Provider value={{ mainDataGrid }}>{children}</DatosDinamicosContext.Provider>;
};

type DatosDinamicosProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { DatosDinamicosContext, DatosDinamicosProvider };
