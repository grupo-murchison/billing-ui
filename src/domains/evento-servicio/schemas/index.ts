import z from 'zod';

export const EventosServicioCreateSchema = z.object({
  nroFacturacion: z.string({ required_error: 'El campo es requerido.', invalid_type_error: "El campo es requerido."}),
  clienteId: z.object({ 
    value: z.number({ required_error: 'El campo es requerido.' }),
    code: z.string({ required_error: 'El campo es requerido.' }),
    label: z.string({ required_error: 'El campo es requerido.' })
  }, { required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' }),
  contrato: z.string({ required_error: 'El campo es requerido.', invalid_type_error: "El campo es requerido."}),
  conceptoAcuerdo: z.string({ required_error: 'El campo es requerido.', invalid_type_error: "El campo es requerido."}),
  fechaHasta: z.date({ required_error: 'El campo es requerido.', invalid_type_error: "El campo es requerido."}),
  fechaDesde: z.date({ required_error: 'El campo es requerido.', invalid_type_error: "El campo es requerido."}),
});

export type EventosServicioFormSchemaType = z.infer<typeof EventosServicioCreateSchema>;
