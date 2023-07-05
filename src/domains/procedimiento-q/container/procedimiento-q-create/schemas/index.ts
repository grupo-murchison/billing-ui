import z from 'zod';

export const ProcedimientoQCreateSchema = z.object({
  codigo: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(50, { message: 'Ha superado el límite de caracteres' }),
  descripcion: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(250, { message: 'Ha superado el límite de caracteres' }),
  denominacion: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(50, { message: 'Ha superado el límite de caracteres' }),
  tipoProcedimientoQId: z.number({ required_error: 'El campo es requerido.' }).or(z.string()),
  procedimientoBuiltinId: z.number({ required_error: 'El campo es requerido.' }).or(z.string()).optional(),
  procedimientoCustomId: z.number({ required_error: 'El campo es requerido.' }).or(z.string()).optional(),
});
// .refine(schema => (schema.tipoProcedimientoQId === 1 ? !!schema.procedimientoBuiltinId : true), {
//   // FIXME schema.reglaFechaPeriodoId === 3 debe pasar a una constante compartida por ambos archivos (éste y CreateContratoV2)
//   // BUG falta pulir, si elijo reglaFechaPeriodoId === 3 por error y luego elijo otro valor, diaPeriodo se deshabilita pero no se limpia el error el Select
//   message: 'El campo es requerido.',
// })
// .refine(schema => (schema.tipoProcedimientoQId === 2 ? !!schema.procedimientoCustomId : true), {
//   // FIXME schema.reglaFechaPeriodoId === 3 debe pasar a una constante compartida por ambos archivos (éste y CreateContratoV2)
//   // BUG falta pulir, si elijo reglaFechaPeriodoId === 3 por error y luego elijo otro valor, diaPeriodo se deshabilita pero no se limpia el error el Select
//   message: 'El campo es requerido.',
// })

export type ProcedimientoQCreateSchemaType = z.infer<typeof ProcedimientoQCreateSchema>;
