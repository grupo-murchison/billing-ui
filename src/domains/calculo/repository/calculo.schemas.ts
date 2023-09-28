import z, { ZodType } from 'zod';

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
    ccTotalCalculado: z.number().nullish(),
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
  numeroSecuenciaCalculo: z.string().nullish(),
  tipoFacturacion: z.string().nullish(),
});

export const ValidationSchemaCalculoFacturacionMasiva: ZodType<FormDataTypeCalculoFacturacionMasiva> = z.object({
  fechaHastaCalculo: z.date(),
  sociedadId: z.number({ required_error: 'El campo es requerido.' }),
  sinMensajesLogOk: z.boolean(),
  sinMensajesLogInfo: z.boolean(),
});

export type FormDataTypeCalculoFacturacionMasiva = {
  fechaHastaCalculo?: Date | null | string;
  sociedadId?: number | string;
  sinMensajesLogOk: boolean;
  sinMensajesLogInfo: boolean;
};

export const CalculoFacturacionLogSchema = z
  .object({
    numeroSecuenciaCalculo: z.number().nullish().or(z.literal('')),
    nroContrato: z.number().nullish().or(z.literal('')),
    clienteId: z
      .object({
        value: z.number({ required_error: 'El campo es requerido.' }).or(z.literal('')),
        code: z.string({ required_error: 'El campo es requerido.' }).or(z.literal('')),
        label: z.string({ required_error: 'El campo es requerido.' }).or(z.literal('')),
      })
      .nullable()
      .optional(),
    fechaHasta: z
      .date({ required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' })
      .nullable(),
    fechaDesde: z
      .date({ required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' })
      .nullable(),
  })
  .refine(({ fechaDesde, fechaHasta }) => fechaHasta == null || fechaDesde == null || fechaHasta >= fechaDesde, {
    message: 'Fecha hasta debe ser mayor o igual a Fecha desde',
    path: ['fechaHasta'],
  });

export const getAllFacturasPaginatedSchema = ZodUtils.withPagination(FacturasRowDataGridSchema);
export const getAllFacturasReportePaginatedSchema = ZodUtils.withPagination(FacturasReporteDataGridSchema);
export const getAllCalculoFacturacionLogSchema = ZodUtils.withPagination(CalculoFacturacionLogSchema);

export const getAllFacturasAsDropdownSchema = ZodUtils.DROPDOWN_SCHEMA;

export type FacturasRowDataGridSchema = z.infer<typeof FacturasRowDataGridSchema>;
export type FacturasReporteDataGridSchema = z.infer<typeof FacturasReporteDataGridSchema>;

export type CalculoFacturacionLogSchemaType = z.infer<typeof CalculoFacturacionLogSchema>;
