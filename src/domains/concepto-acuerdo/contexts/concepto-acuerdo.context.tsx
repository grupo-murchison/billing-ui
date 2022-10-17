import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const ConceptoAcuerdoContext = createContext(initialContext);

const ConceptoAcuerdoProvider = ({ children }: ConceptoAcuerdoProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <ConceptoAcuerdoContext.Provider value={{ mainDataGrid }}>{children}</ConceptoAcuerdoContext.Provider>;
};

type ConceptoAcuerdoProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { ConceptoAcuerdoContext, ConceptoAcuerdoProvider };
