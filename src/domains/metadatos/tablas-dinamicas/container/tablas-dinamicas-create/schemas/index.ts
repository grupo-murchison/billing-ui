import z, { ZodType } from 'zod';

export const TablasDinamicasCreateSchema: ZodType<FormDataTypeTablasDinamicasCreate> = z.object({
  nombreTabla: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(250, { message: 'Ha superado el límite de caracteres' }),
  descripcionTabla: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(250, { message: 'Ha superado el límite de caracteres' }),
});

export type FormDataTypeTablasDinamicasCreate = {
  nombreTabla: string;
  descripcionTabla: string;
};

export type TablasDinamicasCreateSchemaType = z.infer<typeof TablasDinamicasCreateSchema>;
