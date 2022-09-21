import z from 'zod';

export const ProductoSoftlandCreateSchema = z.object({
  agrupacion: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(50, { message: 'Ha superado el límite de caracteres' }),
  codigo: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(50, { message: 'Ha superado el límite de caracteres' }),
  descripcion: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(250, { message: 'Ha superado el límite de caracteres' }),
  activo: z.boolean({ required_error: 'El campo es requerido.' }),
  fechaCambioEstado: z.date({ required_error: 'El campo es requerido.' }).nullable(),
});

export type ProductoSoftlandCreateSchemaType = z.infer<typeof ProductoSoftlandCreateSchema>;
