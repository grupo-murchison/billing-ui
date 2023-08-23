import z from 'zod';

export const EventosClientesCreateSchema = z.object({
  clienteId: z.object({ 
    value: z.number({ required_error: 'El campo es requerido.' }),
    code: z.string({ required_error: 'El campo es requerido.' }),
    label: z.string({ required_error: 'El campo es requerido.' })
  }, { required_error: 'Este campo es obligatorio.', invalid_type_error: 'No podes mandarlo vacio' }),
  eventoId: z.object({
    value: z.number({ required_error: 'El campo es requerido.' }),
    code: z.string({ required_error: 'El campo es requerido.' }),
    label: z.string({ required_error: 'El campo es requerido.' })
  }), //
  fechaHasta: z.date({ required_error: 'El campo es requerido.', invalid_type_error: "El campo es requerido."}),
  fechaDesde: z.date({ required_error: 'El campo es requerido.', invalid_type_error: "El campo es requerido."}),
});

export type EventosClienteFormSchemaType = z.infer<typeof EventosClientesCreateSchema>;
