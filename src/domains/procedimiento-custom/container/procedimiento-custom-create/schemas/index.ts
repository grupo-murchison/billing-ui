import z from 'zod';

export const ProcedimientoCustomCreateSchema = z.object({
  codigo: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(50, { message: 'Ha superado el límite de caracteres' }),
  denominacion: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(50, { message: 'Ha superado el límite de caracteres' }),
  funcionId: z.number({ required_error: 'El campo es requerido.' }),
  eventoId: z.number({ required_error: 'El campo es requerido.' }),
  accionId: z.number({ required_error: 'El campo es requerido.' }).optional(),
  eventoCampoId: z.number({ required_error: 'El campo es requerido.' }).optional(),
}).superRefine(({ accionId }, ctx) => {
  if (accionId) {
    ctx.addIssue({
      code: 'custom',
      message: 'Evento Campo es requerido cuando una Acción es seleccionada.',
      path: ['eventoCampoId']
    })
  }
});

export type ProcedimientoCustomCreateSchemaType = z.infer<typeof ProcedimientoCustomCreateSchema>;
