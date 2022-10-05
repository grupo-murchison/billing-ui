import z from 'zod';

export const ProcedimientoPIntervaloCreateSchema = z.object({
  procedimientoPId: z.number({ required_error: 'El campo es requerido.' }),
  intervalo: z.number({ required_error: 'El campo es requerido.' }),
  valorInicial: z.number({ required_error: 'El campo es requerido.' }),
  valorFinal: z.number({ required_error: 'El campo es requerido.' }),
  precio: z.number({ required_error: 'El campo es requerido.' }),
});

export type ProcedimientoPIntervaloCreateSchemaType = z.infer<typeof ProcedimientoPIntervaloCreateSchema>;
