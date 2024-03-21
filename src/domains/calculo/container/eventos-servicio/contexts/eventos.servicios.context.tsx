import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const EventosServiciosContext = createContext(initialContext);

const EventosServiciosProvider = ({ children }: EventosServiciosProps) => {
  const mainDataGrid = useDataGrid();

  return <EventosServiciosContext.Provider value={{ mainDataGrid }}>{children}</EventosServiciosContext.Provider>;
};

type EventosServiciosProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { EventosServiciosContext , EventosServiciosProvider };
