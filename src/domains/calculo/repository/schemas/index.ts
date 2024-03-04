import { zodLocale } from '@app/utils/zod.util';
import z from 'zod';

export const ValidationSchemaEventosServicioFilters = z.object({
  numeroSecuenciaCalculo: z.number({
    required_error: 'El campo es requerido.',
    invalid_type_error: 'El campo es requerido.',
  }),
  clienteId: z.object(
    {
      value: z.number({ required_error: 'El campo es requerido.' }),
      code: z.string({ required_error: 'El campo es requerido.' }),
      label: z.string({ required_error: 'El campo es requerido.' }),
    },
    { required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' },
  ),
  contrato: z.string({ required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' }),
  conceptoAcuerdoId: z.object(
    {
      value: z.number({ required_error: 'El campos es requerido.' }),
      label: z.string({ required_error: 'El campos es requerido.' }),
    },
    { required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' },
  ),
  rangoFechas: z
    .array(z.date({ required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' }))
    .nullable(),
});

export const ValidationSchemaFacturacionReversion = z.object({
  clienteId: z.object(
    {
      value: z.number({ required_error: 'El campo es requerido.' }),
      code: z.string({ required_error: 'El campo es requerido.' }),
      label: z.string({ required_error: 'El campo es requerido.' }),
    },
    { required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' },
  ),
  numeroSecuenciaCalculo: z.string({}),
  nroContrato: z.number({ required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' }),
  fechaHasta: z.date({ required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' }),
  fechaDesde: z.date({ required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' }),
});

export type FacturacionReversionFormSchemaType = z.infer<typeof ValidationSchemaFacturacionReversion>;

export const ValidationSchemaCalculoReporteFilter = z.object({
  clienteId: z
    .object(
      {
        value: z.number({ required_error: zodLocale.required_error }),
        code: z.string({ required_error: zodLocale.required_error }),
        label: z.string({ required_error: zodLocale.required_error }),
      },
      { required_error: zodLocale.required_error, invalid_type_error: zodLocale.invalid_type_error },
    )
    .nullable(),
  numeroSecuenciaCalculo: z
    .number({
      required_error: zodLocale.required_error,
      invalid_type_error: zodLocale.invalid_type_error,
    })
    .nullable()
    .or(z.literal('')),
  nroContrato: z
    .number({ required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' })
    .nullable()
    .or(z.literal('')),
  rangoFechas: z
    .array(z.date({ required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' }))
    .nullable(),
});

export type FacturacionReporteFormSchemaType = z.infer<typeof ValidationSchemaCalculoReporteFilter>;

export type EventosServicioFormSchemaType = z.infer<typeof ValidationSchemaEventosServicioFilters>;
