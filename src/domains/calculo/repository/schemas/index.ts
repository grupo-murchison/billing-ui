import { dateOrNullTuple, zodLocale } from '@app/utils/zod.util';
import z from 'zod';

export const EventosServicioValidationSchema = z
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
      .number({ required_error: zodLocale.required_error, invalid_type_error: zodLocale.invalid_type_error })
      .nullable()
      .or(z.literal('')),
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
    rangoFechas: z.union([dateOrNullTuple, z.array(z.never())]),
  })
  .superRefine((data, ctx) => {
    const { rangoFechas } = data;
    if (Array.isArray(rangoFechas) && rangoFechas[0] && rangoFechas[0] !== null && rangoFechas[1] === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El segundo parámetro de fecha es requerido.',
        path: ['rangoFechas', 1],
      });
    }
  });

export type EventosServicioFormDataType = {
  clienteId: {
    value: number;
    code: string;
    label: string;
  } | null;
  numeroSecuenciaCalculo: number | string | null;
  contrato: number | string | null;
  conceptoAcuerdoId: {
    value: number;
    code: string;
    label: string;
  } | null;
  rangoFechas: [Date, Date] | [];
};

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
