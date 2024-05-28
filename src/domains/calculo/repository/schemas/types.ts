import { ReactNode } from 'react';

export type CalculoProviderProps = {
  children?: ReactNode;
};

export type InitialContext<T> = {
  mainDataGrid: T;
  estadosContrato: Record<'value' | 'label', string>[];
  estadosPeriodos: Record<'value' | 'label', string>[];
  isContratoActivo: (estado: string) => boolean;
  isPeriodoCalculado: (estado: string) => boolean;
  handleDisableCalcular: (row: Periodo, rows: Periodo[]) => boolean;
};

export type Periodo = {
  id: number;
  contratoPlanFacturacionId: number;
  liquidacionDesde: string;
  liquidacionHasta: string;
  fechaFacturacion: string;
  estado: string;
  periodo: number;
  disabled: boolean;
};

export type PlanFacturacion = {
  id: number;
  tipoPlanFacturacionId: number;
  fechaInicio: string;
  fechaFin: string;
  reglaFechaPeriodoId: number;
  diaPeriodo: number;
  pausado: boolean;
  automatico: boolean;
  periodos: Periodo[];
};

export type ResponsePlanFacturacion = Record<'data', Array<PlanFacturacion>>;
