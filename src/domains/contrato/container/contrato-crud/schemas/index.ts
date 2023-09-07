import { zodLocale } from '@app/constants';
import z from 'zod';

const ContratoVariablesSchema = z.object({
  id: z.number(),
  codigo: z.string().optional(),
  valor: z.string().optional().nullable(),
});

const PlanFacturacionPeriodosSchema = z.object({
  id: z.number(),
  periodo: z.number(),
  liquidacionDesde: z.string(),
  liquidacionHasta: z.string(),
  fechaFacturacion: z.string(),
  estado: z.string(),
});

export const ContratoCreateSchema = z
  .object({
    clienteId: z.number({ required_error: zodLocale.required_error, invalid_type_error: zodLocale.required_error }), // .string().nonempty()
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
    fechaInicioContrato: z
      .date({
        required_error: zodLocale.required_error,
        invalid_type_error: zodLocale.required_error,
      })
      .nullable(),
    fechaFinContrato: z
      .date({
        required_error: zodLocale.required_error,
        invalid_type_error: zodLocale.required_error,
      })
      .nullable(),
    diaPeriodo: z
      .number({ required_error: zodLocale.required_error })
      .positive({ message: zodLocale.numberPositive })
      .or(z.literal('')),
  })
  .superRefine((values, ctx) => {
    if (values.reglaFechaPeriodoId === 3 && values.diaPeriodo === '') {
      ctx.addIssue({
        message: zodLocale.required_error,
        code: 'custom',
        path: ['diaPeriodo'],
      });
    }

    if (values.fechaInicioContrato === null) {
      ctx.addIssue({
        message: zodLocale.required_error,
        code: 'custom',
        path: ['fechaInicioContrato'],
      });
    }

    if (values.fechaFinContrato === null) {
      ctx.addIssue({
        message: zodLocale.required_error,
        code: 'custom',
        path: ['fechaFinContrato'],
      });
    }

    if (values.fechaFinContrato && values.fechaInicioContrato && values.fechaFinContrato < values.fechaInicioContrato) {
      ctx.addIssue({
        message: 'Fecha Fin Contrato debe ser mayor o igual a Fecha Inicio Contrato',
        code: 'custom',
        path: ['fechaFinContrato'],
      });
    }
  });

const _ContratoEditSchema = z.object({
  conceptosAcuerdo: z.array(z.any()),
  contratoVariables: z.array(ContratoVariablesSchema),
  nroContrato: z.string().optional(), // * Aunque el valor es numérico en la DB se guarda como string
  pausado: z.boolean().nullable().optional(),
  periodos: z.array(PlanFacturacionPeriodosSchema),
});

export const ContratoEditSchema = z.intersection(ContratoCreateSchema, _ContratoEditSchema);

export type ContratoCreateSchemaType = z.infer<typeof ContratoCreateSchema>;
export type ContratoEditSchemaType = z.infer<typeof ContratoEditSchema>;
export type PlanFacturacionPeriodosSchemaType = z.infer<typeof PlanFacturacionPeriodosSchema>;
