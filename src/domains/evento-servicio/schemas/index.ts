import z from 'zod';

export const EventosServicioCreateSchema = z
  .object({
    numeroSecuenciaFacturacion: z.number({
      required_error: 'El campo es requerido.',
      invalid_type_error: 'El campo es requerido.',
    }),
    clienteId: z.object(
      {
        value: z.number({ required_error: 'El campo es requerido.' }),
        code: z.string({ required_error: 'El campo es requerido.' }),
        label: z.string({ required_error: 'El campo es requerido.' }),
      },
      { required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' },
    ),
    contrato: z.string({ required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' }),
    conceptoAcuerdoId: z.object(
    {
      value: z.number({ required_error: 'El campos es requerido.' }),
      // code: z.string({ required_error: 'El campos es requerido.' }),
      label: z.string({ required_error: 'El campos es requerido.' }),
    },
    { required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' },
    ),
    fechaHasta: z.date({ required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' }),
    fechaDesde: z.date({ required_error: 'El campo es requerido.', invalid_type_error: 'El campo es requerido.' }),
  })
  .refine(({ fechaDesde, fechaHasta }) => fechaHasta == null || fechaDesde == null || fechaHasta >= fechaDesde, {
    message: 'Fecha hasta debe ser mayor o igual a Fecha desde',
    path: ['fechaHasta'],
  });

export type EventosServicioFormSchemaType = z.infer<typeof EventosServicioCreateSchema>;
