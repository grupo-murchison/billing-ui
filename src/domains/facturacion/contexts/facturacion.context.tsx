import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';
import { truncate } from 'fs/promises';

const estadosContrato = [
  { value: 'ACTIVO', label: 'Activo' },
  { value: 'PAUSADO', label: 'Pausado' },
  { value: 'FINALIZADO', label: 'Finalizado' },
];

const estadosPeriodos = [
  { value: 'ABIERTO', label: 'Abierto' },
  { value: 'ANULADO', label: 'Anulado' },
  { value: 'FACTURADO', label: 'Facturado' },
];

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
  estadosContrato,
  estadosPeriodos,
  isContratoActivo: () => false,
  isPeriodoFacturado: () => false,
};

const FacturacionContext = createContext(initialContext);

const FacturacionProvider = ({ children }: FacturacionProviderProps) => {
  const mainDataGrid = useDataGrid();

  /**
   * La acción  "Abrir Plan Facturacion" (“Facturar”) aparecerá si hay contratos con estado “ACTIVO”
   * @param estado
   * @returns
   */
  const isContratoActivo = (estado: string) => {
    return estado === 'ACTIVO' ? true : false;
  };

  /**
   * La acción "Facturar" se activará para aquel periodo que este en estado "Abierto" o "Anulado"
   * @param estado
   * @returns
   */
  const isPeriodoFacturado = (estado: string) => {
    return estado === 'FACTURADO' ? true : false;
  };

  return (
    <FacturacionContext.Provider
      value={{ mainDataGrid, estadosContrato, estadosPeriodos, isContratoActivo, isPeriodoFacturado }}
    >
      {children}
    </FacturacionContext.Provider>
  );
};

type FacturacionProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
  estadosContrato: Record<'value' | 'label', string>[];
  estadosPeriodos: Record<'value' | 'label', string>[];
  isContratoActivo: (estado: string) => boolean;
  isPeriodoFacturado: (estado: string) => boolean;
};

export { FacturacionContext, FacturacionProvider };
