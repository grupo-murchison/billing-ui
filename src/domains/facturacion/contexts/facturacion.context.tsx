import { createContext } from 'react';
import type { ReactNode } from 'react';

import { useDataGrid } from '@app/hooks';

const estadosContrato = [
  { value: 'ACTIVO', label: 'Activo' },
  { value: 'PAUSADO', label: 'Pausado' },
  { value: 'FINALIZADO', label: 'Finalizado' },
];

const estadosPeriodos = [
  { value: 'ABIERTO', label: 'Abierto' },
  { value: 'ANULADO', label: 'Anulado' }, // anulado, no revierte la facturación
  { value: 'FACTURADO', label: 'Facturado' },
  { value: 'REVERTIDO', label: 'Revertido' }, // es un deshacer, vuelve hacia atras una facturación (calculos, etc)
];

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
  estadosContrato,
  estadosPeriodos,
  isContratoActivo: () => false,
  isPeriodoFacturado: () => false,
  handleDisableFacturar: () => false,
};

const FacturacionContext = createContext(initialContext);

const FacturacionProvider = ({ children }: FacturacionProviderProps) => {
  const mainDataGrid = useDataGrid();

  /**
   * La acción  "Abrir Plan Facturacion" aparecerá si hay contratos con estado “ACTIVO”
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

  /**
   * El periodo anterior al seleccionado debe estar en estado 'FACTURADO' a no ser que sea el primer periodo a facturar.
   * @param row Periodo a evaluar ( fila actual)
   * @param rows todos los periodos
   * @returns boolean
   */
  const handleDisableFacturar = (row: AnyValue, rows: AnyValue[]) => {
    let periodo = row;

    if (periodo?.periodo === 1 && !isPeriodoFacturado(periodo?.estado)) {
      return false;
    } else {
      periodo = rows.find(periodoAnterior => periodoAnterior.periodo === periodo.periodo - 1);
      return isPeriodoFacturado(periodo?.estado) ? false : true;
    }
  };

  return (
    <FacturacionContext.Provider
      value={{
        mainDataGrid,
        estadosContrato,
        estadosPeriodos,
        isContratoActivo,
        isPeriodoFacturado,
        handleDisableFacturar,
      }}
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
  handleDisableFacturar: (row: AnyValue, rows: AnyValue) => boolean;
};

export { FacturacionContext, FacturacionProvider };
