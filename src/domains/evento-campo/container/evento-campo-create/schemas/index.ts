import z, { ZodType } from 'zod';

export const EventoCampoCreateSchema: ZodType<FormDataTypeEventoCampoCreate> = z
  .object({
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
    eventoId: z.number({ required_error: 'El campo es requerido.' }),
    tipoDatoId: z.number({ required_error: 'El campo es requerido.' }),
    tablaDinamicaId: z.number({ required_error: 'El campo es requerido.' }).nullable(),
  })
  .refine(schema => (schema.tipoDatoId === 4 ? !!schema.tablaDinamicaId : true), {
    message: 'El campo es requerido.',
    path: ['tablaDinamicaId'],
  });

export type FormDataTypeEventoCampoCreate = {
  codigo: string;
  denominacion: string;
  descripcion: string;
  campo: string;
  eventoId: number | string;
  tipoDatoId: number | string;
  tablaDinamicaId: number | string | null;
};

export type EventoCampoCreateSchemaType = z.infer<typeof EventoCampoCreateSchema>;
