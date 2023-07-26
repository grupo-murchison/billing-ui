import z from 'zod';

export const ProcedimientoPIntervaloCreateSchema = z.object({
  procedimientoPId: z.number({ required_error: 'El campo es requerido.' }),
  intervalo: z.number({ required_error: 'El campo es requerido.' }),
  valorInicial: z
    .number({ required_error: 'El campo es requerido.' })
    .min(0, { message: 'El valor no puede ser negativo' }),
  valorFinal: z
    .number({ required_error: 'El campo es requerido.' })
    .min(0, { message: 'El valor no puede ser negativo' }),
  precio: z.number({ required_error: 'El campo es requerido.' }),
});

export type ProcedimientoPIntervaloCreateSchemaType = z.infer<typeof ProcedimientoPIntervaloCreateSchema>;
