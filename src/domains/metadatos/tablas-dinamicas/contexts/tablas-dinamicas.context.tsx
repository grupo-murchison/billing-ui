import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const TablasDinamicasContext = createContext(initialContext);

const TablasDinamicasProvider = ({ children }: TablasDinamicasProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <TablasDinamicasContext.Provider value={{ mainDataGrid }}>{children}</TablasDinamicasContext.Provider>;
};

type TablasDinamicasProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { TablasDinamicasContext, TablasDinamicasProvider };
