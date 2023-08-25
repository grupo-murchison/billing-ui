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
    contratoNumero: z.string().nullish(),
    contratoDescripcion: z.string().nullish(),
    contratoClienteId: z.number().nullish(),
    contratoClienteCodigo: z.string().nullish(),
    contratoClienteDescripcion: z.string().nullish(),
    estado: z.string().nullish(),
    id: z.number().nullish(),
    periodoNumero: z.number().nullish(),
    periodoLiquidacionDesde: z.string().nullish(),
    periodoLiquidacionHasta: z.string().nullish(),
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

export const FacturacionLogSchema = z
  .object({
    numeroSecuenciaFacturacion: z.number().nullish(),
    nroContrato: z.number().nullish(),
    clienteId: z
      .object({
        value: z.number({ required_error: 'El campo es requerido.' }),
        code: z.string({ required_error: 'El campo es requerido.' }),
        label: z.string({ required_error: 'El campo es requerido.' }),
      })
      .nullable()
      .optional(),
    fechaHasta: z.date().nullable(),
    fechaDesde: z.date().nullable(),
  })
  .refine(({ fechaDesde, fechaHasta }) => fechaHasta == null || fechaDesde == null || fechaHasta >= fechaDesde, {
    message: 'Fecha hasta debe ser mayor o igual a Fecha desde',
    path: ['fechaHasta'],
  });

export const getAllFacturasPaginatedSchema = ZodUtils.withPagination(FacturasRowDataGridSchema);
export const getAllFacturasReportePaginatedSchema = ZodUtils.withPagination(FacturasReporteDataGridSchema);

export const getAllFacturasAsDropdownSchema = ZodUtils.DROPDOWN_SCHEMA;

export type FacturasRowDataGridSchema = z.infer<typeof FacturasRowDataGridSchema>;
export type FacturasReporteDataGridSchema = z.infer<typeof FacturasReporteDataGridSchema>;
export type FacturacionMasivaSchema = z.infer<typeof FacturacionMasivaSchema>;
export type FacturacionLogSchemaType = z.infer<typeof FacturacionLogSchema>;
