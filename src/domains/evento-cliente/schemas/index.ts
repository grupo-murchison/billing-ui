import z from 'zod';

export const EventosClientesCreateSchema = z
  .object({
    clienteId: z.object(
      {
        value: z.number({ required_error: 'El campo es requerido.' }),
        code: z.string({ required_error: 'El campo es requerido.' }),
        label: z.string({ required_error: 'El campo es requerido.' }),
      },
      { required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' },
    ),
    eventoId: z
      .array(z.object({
        value: z.number(),
        code: z.string(),
        label: z.string(),
      }))
      .nullable()
      .optional(), //
    fechaHasta: z.date().nullable(),
    fechaDesde: z.date().nullable(),
  })
  .refine(({ fechaDesde, fechaHasta }) => fechaHasta == null || fechaDesde == null || fechaHasta >= fechaDesde, {
    message: 'Fecha hasta debe ser mayor o igual a Fecha desde',
    path: ['fechaHasta'],
  });

export type EventosClienteFormSchemaType = z.infer<typeof EventosClientesCreateSchema>;
