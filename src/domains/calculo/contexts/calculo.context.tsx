import { createContext, useCallback } from 'react';

import { useDataGrid } from '@app/hooks';
import { CalculoProviderProps, InitialContext, Periodo } from '../repository/schemas/types';

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

const initialContext: InitialContext<typeof useDataGrid.initialValues> = {
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
  const isContratoActivo = useCallback((estado: string) => estado === 'ACTIVO', []);

  /**
   * La acción "Calcular" se activará para aquel periodo que este en estado "Abierto" o "Anulado"
   * @param estado
   * @returns
   */
  const isPeriodoCalculado = useCallback((estado: string) => estado === 'CALCULADO', []);

  /**
   * El periodo anterior al seleccionado debe estar en estado 'CALCULADO' a no ser que sea el primer periodo a facturar.
   * @param periodo Periodo a evaluar ( fila actual)
   * @param periodos todos los periodos
   * @returns boolean
   */
  const handleDisableCalcular = (periodo: Periodo, periodos: Periodo[]) => {
    if (periodo?.periodo === 1) {
      return isPeriodoCalculado(periodo?.estado);
    } else {
      const periodoAnterior = periodos.find(periodoAnterior => periodoAnterior.periodo === periodo.periodo - 1);
      if (!periodoAnterior) return true;
      return !isPeriodoCalculado(periodoAnterior?.estado) || isPeriodoCalculado(periodo?.estado);
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

export { CalculoContext, CalculoProvider };
