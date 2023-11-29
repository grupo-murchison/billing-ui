import z, { ZodType } from 'zod';

export const EventoCampoCreateSchema: ZodType<FormDataTypeEventoCampoCreate> = z.object({
  codigo: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(50, { message: 'Ha superado el límite de caracteres' }),
  denominacion: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(250, { message: 'Ha superado el límite de caracteres' }),
  descripcion: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(250, { message: 'Ha superado el límite de caracteres' }),
  campo: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(250, { message: 'Ha superado el límite de caracteres' }),
  evento: z.number({ required_error: 'El campo es requerido.' }),
  tipoDatoId: z.number({ required_error: 'El campo es requerido.' }),
});

export type FormDataTypeEventoCampoCreate = {
  codigo: string;
  denominacion: string;
  descripcion: string;
  campo:string;
  evento: number | string;
  tipoDatoId: number | string;
};

export type EventoCampoCreateSchemaType = z.infer<typeof EventoCampoCreateSchema>;
