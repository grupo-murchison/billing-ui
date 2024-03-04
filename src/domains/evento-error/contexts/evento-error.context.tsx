import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const EventoErrorContext = createContext(initialContext);

const EventoErrorProvider = ({ children }: EventoErrorProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <EventoErrorContext.Provider value={{ mainDataGrid }}>{children}</EventoErrorContext.Provider>;
};

type EventoErrorProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { EventoErrorContext, EventoErrorProvider };
