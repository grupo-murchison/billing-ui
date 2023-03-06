import z from 'zod';

const ContratoVariablesSchema = z.object({
  id: z.number(),
  codigo: z.string(),
  valor: z.string()
})

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
    diaPeriodo: z.number().optional(),
  })
  .refine(schema => (schema.reglaFechaPeriodoId === 3 ? !!schema.diaPeriodo : true), {
    // FIXME schema.reglaFechaPeriodoId === 3 debe pasar a una constante compartida por ambos archivos (éste y CreateContratoV2)
    // BUG falta pulir, si elijo reglaFechaPeriodoId === 3 por error y luego elijo otro valor, diaPeriodo se deshabilita pero no se limpia el error el Select
    message: 'El campo es requerido.',
  });

export const ContratoEditSchema = z
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
    fechaInicioContrato: z.date({ required_error: 'El campo es requerido.' }).nullable(),
    fechaFinContrato: z.date({ required_error: 'El campo es requerido.' }).nullable(),
    diaPeriodo: z.number().optional(),
    pausado: z.boolean().optional(),
    nroContrato: z.boolean().optional(),
    contratoVariables: z.array(ContratoVariablesSchema)
  })
  .refine(schema => (schema.reglaFechaPeriodoId === 3 ? !!schema.diaPeriodo : true), {
    // FIXME schema.reglaFechaPeriodoId === 3 debe pasar a una constante compartida por ambos archivos (éste y CreateContratoV2)
    // BUG falta pulir, si elijo reglaFechaPeriodoId === 3 por error y luego elijo otro valor, diaPeriodo se deshabilita pero no se limpia el error el Select
    message: 'El campo es requerido.',
  });


export type ContratoCreateSchemaType = z.infer<typeof ContratoCreateSchema>;
export type ContratoEditSchemaType = z.infer<typeof ContratoEditSchema>;
