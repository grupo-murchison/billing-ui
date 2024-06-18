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

export type CalculoContratoEvento = {
  conceptosAcuerdoId: number[];
  eventos: [Evento[]];
  id: number;
  numeroSecuenciaCalculo: string;
  nroContrato: string;
  modeloAcuerdoId: number;
  clienteId: number;
};

export type Evento = {
  _id: number | string;
  id: number | string;
  clienteId: number;
  eventoId: number;
  genEventoOrigenId: string;
  genEventoTipoId: string;
  genEventoFechaCreacion: string;
  genEventoFechaModificacion: string;
  genEventoFechaEnvio: string;
  genCompania: string;
  genSistema: string;
  genClienteId: string;
  genDestinoTipo: string;
  genDestinoId: string;
  genTerminalId: string | null;
  genPatio: string | null;
  genZona: string | null;
  genTarea: string | null;
  genOrdenCompra: string | null;
  evCantidadLitros: string | null;
  evTipoCombustible: string | null;
  evConcesionario: string | null;
  evModelo: string | null;
  evColor: string | null;
  evDaño: string | null;
  evTipoDaño: string | null;
  evCategorizacion: string | null;
  evPieza: string | null;
  evEstado: string | null;
  evDUA: string | null;
  evTipoEmbarque: string | null;
  evDimension: string | null;
  evDestino: string | null;
  evCiudadDestino: string | null;
  evTipoServicio: string | null;
  evDocumentoSalida: string | null;
  evDiaHabil: string | null;
  evAlmacen: string | null;
  evHallazgos: string | null;
};

export type ResponsePlanFacturacion = Record<'data', Array<PlanFacturacion>>;
