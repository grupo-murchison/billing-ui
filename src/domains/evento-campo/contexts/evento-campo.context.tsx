import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const EventoCampoContext = createContext(initialContext);

const EventoCampoProvider = ({ children }: EventoCampoProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <EventoCampoContext.Provider value={{ mainDataGrid }}>{children}</EventoCampoContext.Provider>;
};

type EventoCampoProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { EventoCampoContext, EventoCampoProvider };
