import z from 'zod';

import { ZodUtils } from '@app/utils';

const FacturasRowDataGridSchema = z.object({
  id: z.number(),
  clienteDescripcion: z.string().nullish(),
  clienteId: z.number().nullish(),
  contratoDescripcion: z.string().nullish(),
  denominación: z.string().nullish(),
  estado: z.string().nullish(),
  facturacionCabeceraEstado: z.string().nullish(),
  facturacionCabeceraNumeroSecuenciaFacturacion: z.string().nullish(),
  fechaCalculoDesde: z.string().nullish(),
  numeroSecuenciaContrato: z.string().nullish(),
  periodo: z.string().nullish(),
});

const contratoSchema = z
  .object({
    contratoId: z.number().nullish(),
    contratoNro: z.string().nullish(),
    contratoClienteDescripcion: z.string().nullish(),
    contratoClienteNumero: z.string().nullish(),
    periodoNumero: z.number().nullish(),
    sociedadDenominacion: z.string().nullish(),
  })
  .array();

const FacturasReporteDataGridSchema = z.object({
  id: z.number(),
  contratos: contratoSchema,
  estado: z.string().nullish(),
  fechaEjecucion: z.string().nullish(),
  numeroSecuenciaFacturacion: z.string().nullish(),
  tipoFacturacion: z.string().nullish(),
});

const FacturacionMasivaSchema = z.object({
  fechaHastaFacturacion: z.date(),
  sociedadId: z.number({ required_error: 'El campo es requerido.' }).nullish(),
  sinMensajesLogOk: z.boolean(),
  sinMensajesLogInfo: z.boolean(),
});

const FacturacionMasivaLogSchema = z.object({
  numeroSecuenciaFacturacion: z.number().nullish(),
  nroContrato: z.number().nullish(),
  clienteId: z.number().nullish(),
  cantidad: z.number().nullish(),
  fechaDesde: z.string().nullish(),
  fechaHasta: z.string().nullish(),
});

export const getAllFacturasPaginatedSchema = ZodUtils.withPagination(FacturasRowDataGridSchema);
export const getAllFacturasReportePaginatedSchema = ZodUtils.withPagination(FacturasReporteDataGridSchema);

export const getAllFacturasAsDropdownSchema = ZodUtils.DROPDOWN_SCHEMA;

export type FacturasRowDataGridSchema = z.infer<typeof FacturasRowDataGridSchema>;
export type FacturasReporteDataGridSchema = z.infer<typeof FacturasReporteDataGridSchema>;
export type FacturacionMasivaSchema = z.infer<typeof FacturacionMasivaSchema>;
export type FacturacionMasivaLogSchema = z.infer<typeof FacturacionMasivaLogSchema>;
