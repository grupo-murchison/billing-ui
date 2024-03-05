import { zodLocale } from '@app/utils/zod.util';
import z from 'zod';

export const ValidationSchemaEventosServicioFilters = z
  .object({
    numeroSecuenciaCalculo: z
      .number({
        required_error: zodLocale.required_error,
        invalid_type_error: zodLocale.invalid_type_error,
      })
      .nullable()
      .or(z.literal('')),
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
    contrato: z
      .string({ required_error: zodLocale.required_error, invalid_type_error: zodLocale.invalid_type_error })
      .nullable(),
    conceptoAcuerdoId: z
      .object(
        {
          value: z.number({ required_error: zodLocale.required_error }),
          // code: z.string({ required_error: zodLocale.required_error }),
          label: z.string({ required_error: zodLocale.required_error }),
        },
        { required_error: zodLocale.required_error, invalid_type_error: zodLocale.invalid_type_error },
      )
      .nullable(),
    fechaHasta: z
      .date({ required_error: zodLocale.required_error, invalid_type_error: zodLocale.invalid_type_error })
      .nullable(),
    fechaDesde: z
      .date({ required_error: zodLocale.required_error, invalid_type_error: zodLocale.invalid_type_error })
      .nullable(),
  })
  .refine(({ fechaDesde, fechaHasta }) => fechaHasta == null || fechaDesde == null || fechaHasta >= fechaDesde, {
    message: 'Fecha hasta debe ser mayor o igual a Fecha desde',
    path: ['fechaHasta'],
  });

export const ValidationSchemaFacturacionReversion = z.object({
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
    .number({ required_error: zodLocale.required_error, invalid_type_error: zodLocale.invalid_type_error })
    .nullable()
    .or(z.literal('')),
  rangoFechas: z
    .array(z.date({ required_error: zodLocale.required_error, invalid_type_error: zodLocale.invalid_type_error }))
    .nullable(),
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
    .number({ required_error: zodLocale.required_error, invalid_type_error: zodLocale.invalid_type_error })
    .nullable()
    .or(z.literal('')),
  rangoFechas: z
    .array(z.date({ required_error: zodLocale.required_error, invalid_type_error: zodLocale.invalid_type_error }))
    .nullable(),
});

export type FacturacionReporteFormSchemaType = z.infer<typeof ValidationSchemaCalculoReporteFilter>;

export type EventosServicioFormSchemaType = z.infer<typeof ValidationSchemaEventosServicioFilters>;
