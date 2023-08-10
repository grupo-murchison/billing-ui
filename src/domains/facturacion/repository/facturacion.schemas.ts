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
    estado: z.string().nullish(),
    id: z.number().nullish(),
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

export const getAllFacturasPaginatedSchema = ZodUtils.withPagination(FacturasRowDataGridSchema);
export const getAllFacturasReportePaginatedSchema = ZodUtils.withPagination(FacturasReporteDataGridSchema);

export const getAllFacturasAsDropdownSchema = ZodUtils.DROPDOWN_SCHEMA;

export type FacturasRowDataGridSchema = z.infer<typeof FacturasRowDataGridSchema>;
export type FacturasReporteDataGridSchema = z.infer<typeof FacturasReporteDataGridSchema>;
