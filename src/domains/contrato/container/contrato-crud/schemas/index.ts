import z, { ZodType } from 'zod';
import { zodId, zodLocale } from '@app/utils/zod.util';
// import { differenceInDays } from 'date-fns';

const ContratoVariablesSchema = z.object({
  id: z.number(),
  codigo: z.string().optional(),
  valor: z.string().optional().nullable(),
});

export type FormDataTypeContratoCreate = {
  clienteId: number | string;
  descripcion: string;
  diaPeriodo: number | string;
  fechaInicioContrato: Date | null;
  fechaFinContrato: Date | null;
  modeloAcuerdoId: number | string;
  reglaFechaPeriodoId: number | string;
  sociedadId: number | string;
  tipoContratoId: number | string;
  tipoPlanFacturacionId: number | string;
};

export const ValidationSchemaContratoCreate: ZodType<FormDataTypeContratoCreate> = z
  .object({
    clienteId: zodId,
    modeloAcuerdoId: z.number({
      required_error: zodLocale.required_error,
      invalid_type_error: zodLocale.required_error,
    }),
    reglaFechaPeriodoId: z.number({
      required_error: zodLocale.required_error,
      invalid_type_error: zodLocale.required_error,
    }),
    tipoContratoId: z.number({
      required_error: zodLocale.required_error,
      invalid_type_error: zodLocale.required_error,
    }),
    tipoPlanFacturacionId: z.number({
      required_error: zodLocale.required_error,
      invalid_type_error: zodLocale.required_error,
    }),
    sociedadId: z.number({ required_error: zodLocale.required_error, invalid_type_error: zodLocale.required_error }),
    descripcion: z
      .string({ required_error: zodLocale.required_error })
      .min(1, { message: zodLocale.required_error })
      .max(250, { message: zodLocale.stringMax(250) }),
    fechaInicioContrato: z.date({
      required_error: zodLocale.required_error,
      invalid_type_error: zodLocale.required_error,
    }),
    fechaFinContrato: z.date({
      required_error: zodLocale.required_error,
      invalid_type_error: zodLocale.required_error,
    }),
    diaPeriodo: z
      .number({ required_error: zodLocale.required_error })
      .positive({ message: zodLocale.numberPositive })
      .or(z.literal('')),
  })
  .superRefine((fields, ctx) => {
    // * por si se requiere validar que haya una difenrencia mínima de días entre las fechas
    // if (differenceInDays(fields.fechaFinContrato, fields.fechaInicioContrato) < 14) {
    //   ctx.addIssue({
    //     message: 'Debe ser 15 días mayor a Fecha Inicio Contrato',
    //     code: 'custom',
    //     path: ['fechaFinContrato'],
    //   });
    // }

    if (fields.fechaFinContrato < fields.fechaInicioContrato) {
      ctx.addIssue({
        message: 'Debe ser mayor o igual a Fecha Inicio Contrato',
        code: 'custom',
        path: ['fechaFinContrato'],
      });
    }
  });

const _ContratoEditSchema = z.object({
  // contratoVariables: z.array(ContratoVariablesSchema),
  nroContrato: z.string().optional(), // * Aunque el valor es numérico en la DB se guarda como string
  pausado: z.boolean().nullable().optional(),
});

export const ValidationSchemaContratoEdit = z.intersection(ValidationSchemaContratoCreate, _ContratoEditSchema);

export type FormDataContratoCreateType = z.infer<typeof ValidationSchemaContratoCreate>;
export type FormDataContratoEditType = z.infer<typeof ValidationSchemaContratoEdit>;
