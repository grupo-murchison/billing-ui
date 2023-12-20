import z, { ZodType } from 'zod';

export const DatosDinamicosCreateSchema: ZodType<FormDataTypeDatosDinamicosCreate> = z.object({
  tablaId: z.number({ required_error: 'El campo es requerido.' }),
  campoCodigo: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(250, { message: 'Ha superado el límite de caracteres' }),
  campoValor: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(250, { message: 'Ha superado el límite de caracteres' }),
  activo: z.boolean(),
});

export type FormDataTypeDatosDinamicosCreate = {
  tablaId: number | string;
  campoCodigo: string;
  campoValor: string;
  activo: boolean;
};

export type DatosDinamicosCreateSchemaType = z.infer<typeof DatosDinamicosCreateSchema>;
