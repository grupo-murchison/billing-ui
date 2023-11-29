import z, { ZodType } from 'zod';

export const EventoCreateSchema: ZodType<FormDataTypeEventoCreate> = z.object({
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
  tipoNegocioId: z.number({ required_error: 'El campo es requerido.' }),
});

export type FormDataTypeEventoCreate = {
  codigo: string;
  denominacion: string;
  descripcion: string;
  tipoNegocioId: number | string;
};

export type EventoCreateSchemaType = z.infer<typeof EventoCreateSchema>;
