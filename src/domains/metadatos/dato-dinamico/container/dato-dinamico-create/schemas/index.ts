import z, { ZodType } from 'zod';

export const DatoDinamicoCreateSchema: ZodType<FormDataTypeDatoDinamicoCreate> = z.object({
  tablaDinamicaId: z.number({ required_error: 'El campo es requerido.' }),
  codigo: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(250, { message: 'Ha superado el límite de caracteres' }),
  valor: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(250, { message: 'Ha superado el límite de caracteres' }),
  activo: z.boolean(),
});

export type FormDataTypeDatoDinamicoCreate = {
  tablaDinamicaId: number | string;
  codigo: string;
  valor: string;
  activo: boolean;
};

export type DatoDinamicoCreateSchemaType = z.infer<typeof DatoDinamicoCreateSchema>;
