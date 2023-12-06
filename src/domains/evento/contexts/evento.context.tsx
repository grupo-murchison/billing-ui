import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const EventoContext = createContext(initialContext);

const EventoProvider = ({ children }: EventoProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <EventoContext.Provider value={{ mainDataGrid }}>{children}</EventoContext.Provider>;
};

type EventoProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { EventoContext, EventoProvider };
