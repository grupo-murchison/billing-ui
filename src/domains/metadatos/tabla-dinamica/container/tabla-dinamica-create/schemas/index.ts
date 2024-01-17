import z, { ZodType } from 'zod';

export const TablaDinamicaCreateSchema: ZodType<FormDataTypeTablaDinamicaCreate> = z.object({
  nombre: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(250, { message: 'Ha superado el límite de caracteres' }),
  descripcion: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(250, { message: 'Ha superado el límite de caracteres' }),
  codigo: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(50, { message: 'Ha superado el límite de caracteres' }),
});

export type FormDataTypeTablaDinamicaCreate = {
  nombre: string;
  descripcion: string;
  codigo: string;
};

export type TablaDinamicaCreateSchemaType = z.infer<typeof TablaDinamicaCreateSchema>;
