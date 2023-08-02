import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const estadoOptions = [
  { value: 'ACTIVO', label: 'Activo' },
  { value: 'PAUSADO', label: 'Pausado' },
  { value: 'FINALIZADO', label: 'Finalizado' },
];

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
  estadoOptions,
};

const FacturacionContext = createContext(initialContext);

const FacturacionProvider = ({ children }: FacturacionProviderProps) => {
  const mainDataGrid = useDataGrid();

  return <FacturacionContext.Provider value={{ mainDataGrid, estadoOptions }}>{children}</FacturacionContext.Provider>;
};

type FacturacionProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
  estadoOptions: Record<'value' | 'label', string>[];
};

export { FacturacionContext, FacturacionProvider };
