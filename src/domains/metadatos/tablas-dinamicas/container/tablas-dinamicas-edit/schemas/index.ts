import z from 'zod';

export const TablasDinamicasEditSchema = z.object({
  nombreTabla: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(250, { message: 'Ha superado el límite de caracteres' }),
  descripcionTabla: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(250, { message: 'Ha superado el límite de caracteres' }),
});

export type TablasDinamicasEditSchemaType = z.infer<typeof TablasDinamicasEditSchema>;
