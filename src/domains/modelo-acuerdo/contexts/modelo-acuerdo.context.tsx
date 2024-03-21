import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const ModeloAcuerdoContext = createContext(initialContext);

const ModeloAcuerdoProvider = ({ children }: ModeloAcuerdoProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <ModeloAcuerdoContext.Provider value={{ mainDataGrid }}>{children}</ModeloAcuerdoContext.Provider>;
};

type ModeloAcuerdoProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { ModeloAcuerdoContext, ModeloAcuerdoProvider };
