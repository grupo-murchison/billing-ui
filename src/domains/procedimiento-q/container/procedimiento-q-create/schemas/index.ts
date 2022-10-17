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
  tipoProcedimientoId: z.number({ required_error: 'El campo es requerido.' }),
});

export type ProcedimientoQCreateSchemaType = z.infer<typeof ProcedimientoQCreateSchema>;
