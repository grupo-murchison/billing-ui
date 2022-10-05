import z from 'zod';

export const ProcedimientoPSIntervaloCreateSchema = z.object({
  procedimientoProductoSoftlandId: z.number({ required_error: 'El campo es requerido.' }),
  productoSoftlandId: z.number({ required_error: 'El campo es requerido.' }),
  intervalo: z.number({ required_error: 'El campo es requerido.' }),
  valorInicial: z.number({ required_error: 'El campo es requerido.' }),
  valorFinal: z.number({ required_error: 'El campo es requerido.' }),
});

export type ProcedimientoPSIntervaloCreateSchemaType = z.infer<typeof ProcedimientoPSIntervaloCreateSchema>;
