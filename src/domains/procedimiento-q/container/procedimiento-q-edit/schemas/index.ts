import z from 'zod';

export const ProcedimientoQEditSchema = z.object({
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

export type ProcedimientoQEditSchemaType = z.infer<typeof ProcedimientoQEditSchema>;
