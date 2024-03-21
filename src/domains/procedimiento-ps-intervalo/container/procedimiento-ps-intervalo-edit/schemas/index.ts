import z from 'zod';

export const ProcedimientoPSIntervaloEditSchema = z.object({
  id: z.number({ required_error: 'El campo es requerido.' }),
  productoSoftlandId: z.number({ required_error: 'El campo es requerido.' }),
  intervalo: z.number({ required_error: 'El campo es requerido.' }),
  valorInicial: z
    .number({ required_error: 'El campo es requerido.' })
    .min(0, { message: 'El valor no puede ser negativo' }),
  valorFinal: z
    .number({ required_error: 'El campo es requerido.' })
    .min(0, { message: 'El valor no puede ser negativo' }),
});

export type ProcedimientoPSIntervaloEditSchemaType = z.infer<typeof ProcedimientoPSIntervaloEditSchema>;
