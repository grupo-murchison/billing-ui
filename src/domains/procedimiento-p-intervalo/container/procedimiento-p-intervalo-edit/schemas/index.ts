import z from 'zod';

export const ProcedimientoPIntervaloEditSchema = z.object({
  id: z.number({ required_error: 'El campo es requerido.' }),
  intervalo: z.number({ required_error: 'El campo es requerido.' }),
  valorInicial: z.number({ required_error: 'El campo es requerido.' }),
  valorFinal: z.number({ required_error: 'El campo es requerido.' }),
  precio: z.number({ required_error: 'El campo es requerido.' }),
});

export type ProcedimientoPIntervaloEditSchemaType = z.infer<typeof ProcedimientoPIntervaloEditSchema>;
