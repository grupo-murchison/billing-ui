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
    tipoContratoId: z.number({ required_error: 'El campo es requerido.' }),
    tipoPlanFacturacionId: z.number({ required_error: 'El campo es requerido.' }),
    reglaFechaPeriodoId: z.number({ required_error: 'El campo es requerido.' }),
    clienteId: z.number({ required_error: 'El campo es requerido.' }),
    modeloAcuerdoId: z.number({ required_error: 'El campo es requerido.' }),
    descripcion: z
      .string({ required_error: 'El campo es requerido.' })
      .min(1, { message: 'El campo es requerido.' })
      .max(250, { message: 'Ha superado el límite de caracteres' }),
    fechaInicioContrato: z.date({ required_error: 'El campo es requerido.' }).nullable(), // TODO por qué permiten null ?
    fechaFinContrato: z.date({ required_error: 'El campo es requerido.' }).nullable(), //TODO por qué permiten null ?
    diaPeriodo: z
      .number({ required_error: 'El campo es requerido.' })
      .positive({ message: 'Debe ser mayor a 0' })
      .or(z.literal('')),
    sociedadId: z.number({ required_error: 'El campo es requerido.' }),
  })
  .superRefine((values, ctx) => {
    if (values.reglaFechaPeriodoId === 3 && values.diaPeriodo === '') {
      ctx.addIssue({
        message: 'El campo es requeridosss.',
        code: 'custom',
        path: ['diaPeriodo'],
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
