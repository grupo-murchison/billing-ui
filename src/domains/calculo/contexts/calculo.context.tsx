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
  { value: 'CALCULADO', label: 'Calculado' },
  { value: 'REVERSADO', label: 'Reversado' }, // es un deshacer, vuelve hacia atras una facturación (calculos, etc)
];

const initialContext: InitialContext = {
  mainDataGrid: useDataGrid.initialValues,
  estadosContrato,
  estadosPeriodos,
  isContratoActivo: () => false,
  isPeriodoCalculado: () => false,
  handleDisableCalcular: () => false,
};

const CalculoContext = createContext(initialContext);

const CalculoProvider = ({ children }: CalculoProviderProps) => {
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
   * La acción "Calcular" se activará para aquel periodo que este en estado "Abierto" o "Anulado"
   * @param estado
   * @returns
   */
  const isPeriodoCalculado = (estado: string) => {
    return estado === 'CALCULADO' || estado === 'FACTURADO' ? true : false; // TODO se debe quitar FACTURADO, falta migrar Back
  };

  /**
   * El periodo anterior al seleccionado debe estar en estado 'FACTURADO' a no ser que sea el primer periodo a facturar.
   * @param row Periodo a evaluar ( fila actual)
   * @param rows todos los periodos
   * @returns boolean
   */
  const handleDisableCalcular = (row: AnyValue, rows: AnyValue[]) => {
    let periodo = row;

    if (periodo?.periodo === 1 && !isPeriodoCalculado(periodo?.estado)) {
      return false;
    } else {
      periodo = rows.find(periodoAnterior => periodoAnterior.periodo === periodo.periodo - 1);
      return isPeriodoCalculado(periodo?.estado) ? false : true;
    }
  };

  return (
    <CalculoContext.Provider
      value={{
        mainDataGrid,
        estadosContrato,
        estadosPeriodos,
        isContratoActivo,
        isPeriodoCalculado,
        handleDisableCalcular,
      }}
    >
      {children}
    </CalculoContext.Provider>
  );
};

type CalculoProviderProps = {
  children?: ReactNode;
};

type InitialContext = {
  mainDataGrid: typeof useDataGrid.initialValues;
  estadosContrato: Record<'value' | 'label', string>[];
  estadosPeriodos: Record<'value' | 'label', string>[];
  isContratoActivo: (estado: string) => boolean;
  isPeriodoCalculado: (estado: string) => boolean;
  handleDisableCalcular: (row: AnyValue, rows: AnyValue) => boolean;
};

export { CalculoContext, CalculoProvider };
