import z from 'zod';

export const ProcedimientoQEditSchema = z
  .object({
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
    tipoProcedimientoQId: z.number({ required_error: 'El campo es requerido.' }).nullable(),
    procedimientoBuiltinId: z.number({ required_error: 'El campo es requerido.' }).nullable().optional(),
    procedimientoCustomId: z.number({ required_error: 'El campo es requerido.' }).nullable().optional(),
  })
  .refine(schema => (schema.tipoProcedimientoQId === 1 ? !!schema.procedimientoBuiltinId : true), {
    message: 'El campo es requerido.',
    path: ['procedimientoBuiltinId'],
  })
  .refine(schema => (schema.tipoProcedimientoQId === 2 ? !!schema.procedimientoCustomId : true), {
    message: 'El campo es requerido.',
    path: ['procedimientoCustomId'],
  })
  .refine(schema => schema.tipoProcedimientoQId !== null, {
    message: 'El campo es requerido.',
    path: ['tipoProcedimientoQId'],
  })
  .refine(schema => (schema.tipoProcedimientoQId === 3 ? !!schema.procedimientoBuiltinId : true), {
    message: 'Tipo de procedimiento no disponible.',
    path: ['tipoProcedimientoQId'],
  });

export type ProcedimientoQEditSchemaType = z.infer<typeof ProcedimientoQEditSchema>;
