import z from 'zod';

export const ConceptoAcuerdoEditSchema = z.object({
  id: z.number({ required_error: 'El campo es requerido.' }),
  descripcion: z
    .string({ required_error: 'El campo es requerido.' })
    .min(1, { message: 'El campo es requerido.' })
    .max(250, { message: 'Ha superado el límite de caracteres' }),
  tipoServicioId: z.number({ required_error: 'El campo es requerido.' }),
  procedimientoQId: z.number({ required_error: 'El campo es requerido.' }),
  procedimientoPId: z.number({ required_error: 'El campo es requerido.' }),
  procedimientoProductoSoftlandId: z.number({ required_error: 'El campo es requerido.' }),
});

export type ConceptoAcuerdoEditSchemaType = z.infer<typeof ConceptoAcuerdoEditSchema>;
