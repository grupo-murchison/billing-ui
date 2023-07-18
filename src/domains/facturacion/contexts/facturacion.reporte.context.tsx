import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
};

const FacturacionReporteContext = createContext(initialContext);

const FacturacionReporteProvider = ({ children }: FacturacionProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <FacturacionReporteContext.Provider value={{ mainDataGrid }}>{children}</FacturacionReporteContext.Provider>;
};

type FacturacionProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
};

export { FacturacionReporteContext , FacturacionReporteProvider };
