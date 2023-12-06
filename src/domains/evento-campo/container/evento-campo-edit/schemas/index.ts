import z, { ZodType } from 'zod';

export const EventoCampoEditSchema: ZodType<FormDataTypeEventoCampoEdit> = z.object({
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

export type FormDataTypeEventoCampoEdit = {
  codigo: string;
  denominacion: string;
  descripcion: string;
  campo:string;
  evento: number | string;
  tipoDatoId: number | string;
};

export type EventoCampoEditSchemaType = z.infer<typeof EventoCampoEditSchema>;
