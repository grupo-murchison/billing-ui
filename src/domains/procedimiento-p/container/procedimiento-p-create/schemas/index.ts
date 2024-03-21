import z, { ZodType } from 'zod';

export const ProcedimientoPCreateSchema: ZodType<FormDataTypeProcedimientoPCreate> = z.object({
  codigo: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(50, { message: 'Ha superado el límite de caracteres' }),
  denominacion: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(250, { message: 'Ha superado el límite de caracteres' }),
  monedaId: z.number({ required_error: 'El campo es requerido.' }),
});

export type FormDataTypeProcedimientoPCreate = {
  codigo: string;
  denominacion: string;
  monedaId: number | string;
};

export type ProcedimientoPCreateSchemaType = z.infer<typeof ProcedimientoPCreateSchema>;
