import z, { ZodType } from 'zod';

export const DatoDinamicoEditSchema: ZodType<FormDataTypeDatoDinamicoEdit> = z.object({
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

export type FormDataTypeDatoDinamicoEdit = {
  tablaDinamicaId: number | string;
  codigo: string;
  valor: string;
  activo: boolean;
};

export type DatoDinamicoEditSchemaType = z.infer<typeof DatoDinamicoEditSchema>;
