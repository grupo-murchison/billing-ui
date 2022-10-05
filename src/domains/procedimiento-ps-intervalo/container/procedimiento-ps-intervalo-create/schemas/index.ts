import z from 'zod';

export const ProcedimientoPSIntervaloCreateSchema = z.object({
  productoSoftlandId: z.number({ required_error: 'El campo es requerido.' }),
  intervalo: z.number({ required_error: 'El campo es requerido.' }),
  valorInicial: z.number({ required_error: 'El campo es requerido.' }),
  valorFinal: z.number({ required_error: 'El campo es requerido.' }),
});

export type ProcedimientoPSIntervaloCreateSchemaType = z.infer<typeof ProcedimientoPSIntervaloCreateSchema>;
