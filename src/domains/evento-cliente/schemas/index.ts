import z from 'zod';

export const EventosClientesCreateSchema = z.object({
  clienteId: z.object({ value: z.string({ required_error: 'El campo es requerido.' }), code: z.string({ required_error: 'El campo es requerido.' }), label: z.string({ required_error: 'El campo es requerido.' })}),
  eventos: z
    .string({ required_error: 'El campo es requerido.' }),
  fechaHasta: z.date({ required_error: 'El campo es requerido.' ,invalid_type_error: "That's not a date!"}),
  fechaDesde: z.date({ required_error: 'El campo es requerido.' }),
});

export type EventosClienteFormSchemaType = z.infer<typeof EventosClientesCreateSchema>;
