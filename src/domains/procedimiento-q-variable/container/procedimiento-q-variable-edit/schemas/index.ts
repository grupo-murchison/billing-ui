import z from 'zod';

export const ProcedimientoQVariableEditSchema = z.object({
  id: z.number({ required_error: 'El campo es requerido.' }),
  tipoId: z.number({ required_error: 'El campo es requerido.' }),
  diccionarioId: z.number({ required_error: 'El campo es requerido.' }),
  codigo: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(50, { message: 'Ha superado el límite de caracteres' }),
  nombre: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(50, { message: 'Ha superado el límite de caracteres' }),
});

export type ProcedimientoQVariableEditSchemaType = z.infer<typeof ProcedimientoQVariableEditSchema>;
